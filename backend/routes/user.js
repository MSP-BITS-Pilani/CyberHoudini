const express = require("express")
const userRouter = express.Router();
const Team = require("../models/team")
const auth = require("../middleware/auth")

userRouter.get("/", auth, async (req, res) => {
    const user = req.user

    if (!user) {
        console.log('Email address not registered')
        res.sendStatus(404)
    }
    else {
        const team = await Team.findById(user.teamID);
        res.send({ user, team })
    }
}

)



module.exports = userRouter