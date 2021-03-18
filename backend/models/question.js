const mongoose = require("mongoose")
const Schema = mongoose.Schema

let questionSchema = new Schema({
    stage: {
        type: String,
        default: '0',
        unique: true
    },

    question: {
        type: String
    },
    image: {
        type: String,
        default: null
    },
    hint: {
        type: String,
        default: null
    },
    points: {
        type: Number,
        default: 100
    }
});

module.exports = mongoose.model("Question", questionSchema);