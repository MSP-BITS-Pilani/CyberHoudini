const express = require("express")
const userRouter = express.Router();
const User = require("../models/user")
const auth = require("../middleware/auth")

userRouter.get("/", auth, (req, res) => {
    const user = req.user
    if (!user) {
        console.log('Email address not registered')
    }
    else
        res.send(user)
})



module.exports = userRouter