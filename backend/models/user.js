const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require("validator");
const jwt = require('jsonwebtoken');

let userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
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
        ref: 'Team'
    },

    picture: {
        type: String,
        required: true
        // lowercase: true
    },

    tokens: [{
        token: {
            type: String
        }
    }],

    oauth_tokens: {
        access_token: {
            type: String
        },
        refresh_token: {
            type: String
        }
    }
});

// Overriding the default method to return user so get users doesnt return tokens
userSchema.methods.toJSON = function () {
    const user = this.toObject();

    delete user.tokens;
    delete user.oauth_tokens;

    return user;
};

// generate authentication token for user using jwt
userSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY);
    user.tokens = user.tokens.concat({ token: token });
    await user.save();

    return token;
};

module.exports = mongoose.model('User', userSchema);