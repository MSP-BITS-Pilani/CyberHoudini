const express = require("express");
const teamRouter = express.Router();
const Team = require("../models/team");
const User = require("../models/user");
const referralCode = require('../helper/referralCodeGenerator');

teamRouter.get("/team", (req, res) => {
    Team.find((err, teams) => {
        if (err) {
            console.error(err);
        } else {
            
            if (teams.length == 0) {
                var testTeams = [
                    { teamName: 'AwesomeTeam', adminID: "60504e977332ae190828221b", lastCorrectAnswer : 'NULL', referralCode: referralCode(6) }
                ];

                // Team.collection.insertOne(testTeams, (err, teams) => { if (err) console.log(err); })
            }
            // res.send(requiredQuery);
        }
    });
});


module.exports = teamRouter