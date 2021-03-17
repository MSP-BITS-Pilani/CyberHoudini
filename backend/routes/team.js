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
        res.send(404)
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

})

module.exports = teamRouter