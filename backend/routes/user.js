const express = require("express")
const userRouter = express.Router();
const User = require("../models/user")

userRouter.get("/", (req, res) => {
    User.find((err, users) => {
        if (err) {
            console.error(err);
        } else {
            if (users.length == 0) {
                var testUsers = [
                    { name: 'cor', desc: 'person who does the thing' },
                    { name: 'jynnie', desc: 'person who does the thing' },
                    { name: 'mntan', desc: 'person who does the thing' }
                ];

                User.collection.insert(testUsers, (err, users) => { if (err) console.log(err); })
            }
            res.send(users)
        }
    })
})
userRouter.get("/UserDetails",(req,res)=>{
    if(!req.query.email){
        return res.send({
            error:"Please Enter email id"
        })
    }
    const email=req.query.email
    //const email="xxx123@gmail.com"
    const user=User.findOne({email: email})
    if(!user){
        console.log('Email address not registered')
    }
    else
    res.send(user)
})



module.exports = userRouter