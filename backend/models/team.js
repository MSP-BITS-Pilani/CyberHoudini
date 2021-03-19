const mongoose = require("mongoose")
const Schema = mongoose.Schema

let teamSchema = new Schema({
    teamName: {
        type: String,
        minLength: 6,
        unique: true,
        required: [true, "Team name is required"]
    },

    adminID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    score: {
        type: Number,
        default: 0
    },

    level: {
        type: Number,
        default: 0
    },

    lastCorrectAnswer: {
        type: Date,
        default: Date()
    },

    referralCode: {
        type: String,
        upperCase: true,
        unique: [true, "Referral code not unique"]
    }
},
    { timestamps: true } // in case chits are to be identified
);

module.exports = mongoose.model("Team", teamSchema)


// 2021-03-19T04:23:55.000+00:00
// 2021-03-19T04:27:17.000+00:00