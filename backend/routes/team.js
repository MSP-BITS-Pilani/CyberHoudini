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
        console.error('Team does not exist');
        res.sendStatus(404)
    }
    else {
        res.send(team);
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
        res.sendStatus(200)
    } catch (error) {
        res.send(error)
    }

});

teamRouter.post("/register/usingrc", auth, async (req, res) => {
    const user = req.user;
    const reffCode = req.query.reffCode;        // reffCode from frontend
    const team = await Team.findOne({ referralCode: reffCode });    // Find the team with reffCode
    if(!team) {
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
        if(no_members[0].count >= 3) {
            console.error('Team is full');
            res.sendStatus(404);
        }
        else {
            try {
                user.teamID = team._id;
                await user.save();
                res.sendStatus(200);
            } catch(error) {
                res.send(error);
            }
        }
    }
});

teamRouter.post("/remove", auth, async (req, res) => {
    const user = req.user;
    const teamID = user.teamID;
    const team = await Team.findOne({ _id: teamID });
    if(team.adminID.toString() == user._id.toString()) {
        const member_email = req.query.email;       // email-id of member to be deleted
        const filter = { email: member_email };
        const update = { teamID : null };
        // Handle the case when admin wants to leave
        if(member_email == user.email.toString()) {
            console.error('Admin cannot remove himself/herself, admin has to remove the team');
            res.sendStatus(404);
        }
        else {
            try {
                await User.findOneAndUpdate(filter, update, {
                    returnOriginal: false
                });
                console.log(member_email + ' removed from team');
                res.sendStatus(200);
            } catch(error) {
                res.send(error);
            }
        }
    }
    else {
        console.error('Unauthorized access');
        res.sendStatus(404);
    }
});

teamRouter.delete("/", auth, async (req, res) => {
    const user = req.user;
    const teamID = user.teamID;
    const team = await Team.findOne({ _id: teamID });
    if(team.adminID.toString() == user._id.toString()) {
        try {
            await User.updateMany(
                {teamID : teamID},
                {
                    $set : {'teamID' : null}
                }
            );
            await Team.deleteOne({_id : teamID});
            console.log('Team removed');
            res.sendStatus(200);
        } catch(error) {
            res.send(error);
        }
    }
    else {
        console.error('Unauthorized access');
        res.sendStatus(404);
    }
});

module.exports = teamRouter