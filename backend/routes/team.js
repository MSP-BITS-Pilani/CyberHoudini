const express = require("express");
const teamRouter = express.Router();
const Team = require("../models/team");
const User = require("../models/user");
const auth = require('../middleware/auth');
const referralCode = require('../helper/referralCodeGenerator');

teamRouter.get("/", auth, async (req, res) => {
    const user = req.user;
    const teamID = user.teamID;
    const team = await Team.findOne({ _id: teamID });
    if (!team) {
        res.status(404).send("Team does not exist")
    }
    else {
        res.status(200).send(team);
    }
});

teamRouter.post("/", auth, async (req, res) => {
    const user = req.user;

    let reffCode = referralCode(6);

    // so that no team have same reff code
    let sameReffCodeTeam = await Team.findOne({ referralCode: reffCode })
    while (sameReffCodeTeam) {
        reffCode = referralCode(6);
        sameReffCodeTeam = await Team.findOne({ referralCode: reffCode })
    }

    const teamName = req.query.teamName;

    const team = new Team({
        teamName,
        adminID: user._id,
        referralCode: reffCode
    })


    try {
        await team.save()
        user.teamID = team._id
        await user.save()
        res.status(201).send("Team created sucessfully");
    } catch (error) {
        res.status(400).send(error)
    }

});

teamRouter.post("/register/usingrc", auth, async (req, res) => {
    const user = req.user;
    const reffCode = req.query.reffCode;        // reffCode from frontend
    const team = await Team.findOne({ referralCode: reffCode });    // Find the team with reffCode
    if (!team) {
        console.error('Invalid referral code');
        res.sendStatus(404);
    }
    else {
        // Check if team is full or not
        const no_members = await User.aggregate([
            {
                $match: {
                    teamID: {
                        $eq: team._id
                    }
                }
            },
            {
                $count: 'count'
            }
        ]
        )
        if (no_members[0].count >= 3) {
            res.status(400).send("Team is full");
        }
        else {
            try {
                user.teamID = team._id;
                await user.save();
                res.status(201).send("User added sucessfully");
            } catch (error) {
                res.status(400).send(error);
            }
        }
    }
});

teamRouter.post("/remove", auth, async (req, res) => {
    const user = req.user;
    const teamID = user.teamID;
    const team = await Team.findOne({ _id: teamID });
    if (team.adminID.toString() == user._id.toString()) {
        const member_email = req.query.email;       // email-id of member to be deleted
        const filter = { email: member_email };
        const update = { teamID: null };
        // Handle the case when admin wants to leave
        if (member_email == user.email.toString()) {
            res.status(400).send("Admin cannot remove himself/herself, admin has to remove the team");
        }
        else {
            try {
                await User.findOneAndUpdate(filter, update, {
                    returnOriginal: false
                });
                res.status(200).send(member_email + " removed from team");
            } catch (error) {
                res.status(400).send(error);
            }
        }
    }
    else {
        res.status(401).send("Unauthorized access");
    }
});

teamRouter.delete("/", auth, async (req, res) => {
    const user = req.user;
    const teamID = user.teamID;
    const team = await Team.findOne({ _id: teamID });
    if (team.adminID.toString() == user._id.toString()) {
        try {
            await User.updateMany(
                { teamID: teamID },
                {
                    $set: { 'teamID': null }
                }
            );
            await Team.deleteOne({ _id: teamID });
            res.status(200).send("Team removed");
        } catch (error) {
            res.status(400).send(error);
        }
    }
    else {
        res.status(401).send("Unauthorized access");
    }
});

module.exports = teamRouter