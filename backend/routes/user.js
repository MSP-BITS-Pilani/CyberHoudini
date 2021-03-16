const express = require("express")
const userRouter = express.Router();
const Team = require("../models/team")
const auth = require("../middleware/auth")

userRouter.get("/", auth, async (req, res) => {
    const user = req.user


    if (!user) {
        console.log('Email address not registered')
    }
    else {
        if (!user.teamID) {
            const team = await Team.findById(user.teamID);
            console.log(user.teamID);
            res.send({ user, team })
        }
        else {
            res.send({ user })
        }
    }

})



module.exports = userRouter