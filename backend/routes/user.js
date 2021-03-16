const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const auth = require('../middleware/auth');

userRouter.get("/", auth, (req,res)=>{
    // if(!req.query.email){
    //     return res.send({
    //         error:"Please Enter email id"
    //     })
    // }
    // const email=req.query.email
    // //const email="xxx123@gmail.com"
    // const user=User.findOne({email: email})

    const user = req.user;
    if(!user){
        console.log('Email address not registered')
    }
    else
    res.send(user)
})



module.exports = userRouter