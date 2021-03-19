require("dotenv").config({ path: "../config.env" })

const path = require("path")

// express and create app 
const express = require('express');
const cookieParser = require("cookie-parser")

// to use cors middleware
const cors = require('cors');

// connect to database
require("./mongo-connect")


const userRouter = require("./routes/user");
const teamRouter = require('./routes/team');
const questionRouter = require('./routes/question');
// const addQuestionRouter = require('./question/add-questions');
const googleLoginRouter = require("./oauth2/googleAuthRouters")

const PORT = 4000;

const app = express();

app.use(express.static(path.join(__dirname, '../frontend/build')));

// enabling CORS
app.use(cors())
app.use(cookieParser());
app.use(express.json());

// custom routers
app.use(googleLoginRouter);
app.use("/users", userRouter);
app.use("/teams", teamRouter);
app.use("/questions", questionRouter);
// app.use("/addquestions", addQuestionRouter);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});