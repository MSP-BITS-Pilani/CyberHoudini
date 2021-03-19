const express = require("express");
const Question = require("../models/question");
const answers = require("../answer");
const Team = require("../models/team");
const User = require("../models/user");
const auth = require('../middleware/auth');

const stageArray = ["-1","0","82","129","235","371","649","793","1139","1349","1679","2291","2573","13","14","99999999","-1"];

// remove this
// const socketio = require("socket.io");
// const http = require('http')

// const app = express()

// const server = http.createServer(app)
// const io = socketio(server)
//

var returnRouter = function (io) {
    const questionRouter = express.Router();

    questionRouter.get("/", auth, async (req, res) => {
        const user = req.user;
        const teamID = user.teamID;
        const team = await Team.findOne({ _id: teamID });
        const level = parseInt(team.level);
        const stage = stageArray[level + 1];
        const question = await Question.findOne({ stage: stage });
        const questionIndex = { questionIndex: level + 1 };

        // io.sockets.join(teamID.toString());

        if (!question) {
            if (level >= 15) {
                res.status(200).send({ level: 15 })
            }
            console.error('No such stage');
            res.sendStatus(404);
        }
        else {
            console.log(question);
            res.status(200).send({ question, questionIndex });
        }
    });

    questionRouter.post("/", auth, async (req, res) => {
        const user = req.user;
        const teamID = user.teamID;
        const team = await Team.findOne({ _id: teamID });
        const level = parseInt(team.level);
        const stage = stageArray[level + 1];
        const question = await Question.findOne({ stage: stage });
        const points = question.points;
        const response = req.body.userAnswer;
        const status = { correct: false };
        const members = await User.find({ teamID: teamID });

        if (response.toString() === answers.answers[level]) {
            // io.on("connection", async (socket) => {
            //     console.log('Connection established!')
            const topTeams = await Team.find({}).sort([["score", -1], ["lastCorrectAnswer", 1]]).limit(10);
            //     socket.emit("updateLeaderBoard", topTeams)
            // })

            io.sockets.emit("updateLeaderBoard", topTeams)
            status.correct = true;
            try {
                team.score = team.score + points;
                team.level = level + 1;
                team.lastCorrectAnswer = Date();
                await team.save();
                io.sockets.to(teamID.toString()).emit("levelChange", "aage badho chalo");
                console.log("Your answer is correct, Score updated successfully");
                res.status(200).send({ team, members, status });
            } catch (error) {
                res.status(400).send(error)
            }
        }
        else {
            res.status(200).send({ team, members, status });
        }
    });

    questionRouter.get("/leaderboard", async (req, res) => {
        try {
            const topTeams = await Team.find({}).sort([["score", -1], ["lastCorrectAnswer", 1]]).limit(10);
            res.send(topTeams);
        } catch (err) {
            res.status(400).send(err);
        }
    })
    return questionRouter;
}


module.exports = returnRouter