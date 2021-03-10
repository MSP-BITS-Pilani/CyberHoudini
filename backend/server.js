require("dotenv").config({ path: "../config.env" })
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const userRouter = require("./routes/user");
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

app.use('/users', userRouter);
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});