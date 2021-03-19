const express = require("express");
const questionRouter = express.Router();
const Question = require("../models/question");
const answers = require("../answer");
const Team = require("../models/team");
const User = require("../models/user");
const auth = require('../middleware/auth');
const stageArray = ["-1","0","82","129","235","371","649","793","1139","1349","1679","2291","2573","13","14","99999999","-1"];

questionRouter.get("/", auth, async(req, res) => {
    const user = req.user;
    const teamID = user.teamID;
    const team = await Team.findOne({ _id: teamID });
    const level = parseInt(team.level);
    const stage = stageArray[level + 1];
    const question = await Question.findOne({ stage: stage });
    const questionIndex = {questionIndex : level + 1};
    if(!question) {
        console.error('No such stage');
        res.sendStatus(404);
    }
    else {
        console.log(question);
        res.status(200).send({question, questionIndex});
    }
});

questionRouter.post("/", auth, async(req, res) => {
    const user = req.user;
    const teamID = user.teamID;
    const team = await Team.findOne({ _id: teamID });
    const level = parseInt(team.level);
    const stage = stageArray[level + 1];
    const question = await Question.findOne({ stage: stage });
    const points = question.points;
    const response = req.body.userAnswer;
    const status = {correct: false};
    const members = await User.find({ teamID: teamID });

    if(response.toString() === answers.answers[level]) {
        status.correct = true;
        try {
            team.score = team.score + points;
            team.level = level + 1;
            team.lastCorrectAnswer = Date();
            await team.save();
            console.log("Your answer is correct, Score updated successfully");
            res.status(200).send({team, members, status});
        } catch (error) {
            res.status(400).send(error)
        }
    }
    else {
        res.status(200).send({team, members, status});
    }
});

module.exports = questionRouter