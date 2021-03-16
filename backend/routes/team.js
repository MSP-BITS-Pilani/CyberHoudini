const express = require("express");
const teamRouter = express.Router();
const Team = require("../models/team");
const User = require("../models/user");
const auth = require('../middleware/auth');
const referralCode = require('../helper/referralCodeGenerator');

teamRouter.get("/", auth, async (req, res) => {
    const user = req.user;
    const teamID = user.teamID;
    const team = await Team.findOne({_id : teamID});
    if (!team) {
        console.error('Team does not exist');
    }
    else {
        res.send(team);
    }
});


// const express = require("express");
// const teamRouter = express.Router();
// const Team = require("../models/team");
// const auth = require('../middleware/auth');

// teamRouter.get("/", auth, (req,res)=>{
//     // if(!req.query.email){
//     //     return res.send({
//     //         error:"Please Enter email id"
//     //     })
//     // }
//     // const email=req.query.email
//     // //const email="xxx123@gmail.com"
//     // const user=User.findOne({email: email})
//     const user = req.user;
    
// })

module.exports = teamRouter