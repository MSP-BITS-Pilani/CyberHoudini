const express = require("express");
const questionRouter = express.Router();
const Question = require("../models/question");
const answers = require("../answer");
const Team = require("../models/team");
const User = require("../models/user");
const auth = require('../middleware/auth');

questionRouter.get("/", auth, async(req, res) => {
    const stage = req.body.questionID;
    const question = await Question.findOne({ stage: stage });
    if(!question) {
        console.error('No such stage');
        res.sendStatus(404);
    }
    else {
        console.log(question);
        res.status(200).send(question);
    }
});

questionRouter.post("/", auth, async(req, res) => {
    const stage = req.body.questionID;
    const qi = req.body.questionIndex;
    const questionIndex = parseInt(qi);
    const question = await Question.findOne({ stage: stage });
    const points = question.points;
    const user = req.user;
    const teamID = user.teamID;
    const team = await Team.findOne({ _id: teamID });
    const response = req.body.userAnswer;
    const status = {correct: false};
    const members = await User.find({ teamID: teamID });

    if(response.toString() === answers.answers[questionIndex - 1]) {
        status.correct = true;
        try {
            team.score = team.score + points;
            team.level = questionIndex;
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