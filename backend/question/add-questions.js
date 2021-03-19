const questions = require('./question');
const express = require('express');
const addQuestionRouter = express.Router();
const Question = require("../models/question");

addQuestionRouter.get("/", (req, res) => {
    const questionArray = questions.questions;
    questionArray.forEach(async(question, index) => {
        const q = new Question({
            stage: question.stage,
            question: question.question,
            image: question.image,
            hint: question.hint
        });
        try {
            await q.save();
            console.log('Data entered in database');
        } catch (error) {
            res.send(error)
        } 
    });
    res.sendStatus(200);
});

module.exports = addQuestionRouter;