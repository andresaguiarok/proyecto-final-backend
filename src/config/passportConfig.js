const passport = require("passport")
const {userModel} = require("../dao/models/usersModel")
const GitHubStrategy = require("passport-github2")
require("dotenv").config()

const initPassportGithub = () => {
    passport.use("github", new GitHubStrategy({
        clientID: process.env.GITHUB_KEY_CLIENTID,
        clientSecret: process.env.GITHUB_KEY_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({email: profile._json.email})

            if(!user){
                let newUser = {
                    firtsName: profile._json.name,
                    lastName: profile.username,
                    userName: profile._json.login ,
                    email: profile._json.email,
                    birthDate: profile._json.created_at ,
                    password: " ",
                }
                let result = await userModel.create(newUser)
                return done(null,result)
            }
            
            user = {
                _id: user._id,
                firtsName: user.firtsName,
                lastName: user.lastName,
                userName: user.userName,
                email: user.email,
                birthDate: user.birthDate.toISOString().substring(0,10),
                role: user.role
            }

            return done(null, user)
        } catch (error) {
            console.log(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser((async (id, done) => {
        let user = await userModel.findOne({_id: id})
        done(null,user)
    }))
}

module.exports = {
    initPassportGithub
}