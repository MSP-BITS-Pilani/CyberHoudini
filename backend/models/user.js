const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require("validator");

let User = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    emailId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        },
    },

    teamID: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    }
});
module.exports = mongoose.model('User', User);