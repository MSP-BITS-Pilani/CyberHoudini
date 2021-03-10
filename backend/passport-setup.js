const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require("./models/user")

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
},
    (accessToken, refreshToken, profile, done) => {
        User.findOrCreate({ googleID: profile.id }, function (err, user) {
            return done(err, user)
        })
    })
)
