const express = require("express");
const questionRouter = express.Router();
const Question = require("../models/question");
const auth = require('../middleware/auth');

questionRouter.get("/", auth, async(req, res) => {
    const stage = req.body.questionID;
    console.log(stage);
    const question = await Question.findOne({ stage: stage });
    if(!question) {
        console.error('No such stage');
        res.sendStatus(404);
    }
    else {
        console.log(question);
        res.send(question);
        res.sendStatus(200);
    }
});

module.exports = questionRouter