const passport = require("passport")
const {userModel} = require("../dao/models/usersModel.js")
const GitHubStrategy = require("passport-github2")
const UserManager = require("../dao/mongoDb/userManagerMongo.js")
const userManager = new UserManager()
require("dotenv").config()

const initPassportGithub = () => {
    passport.use("github", new GitHubStrategy({
        clientID: process.env.GITHUB_KEY_CLIENTID,
        clientSecret: process.env.GITHUB_KEY_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            let user = await userManager.getUser(profile._json.email)
            
            if(!user.email){
                let result = await userManager.createUser({
                    firtsName: profile._json.name, lastName: profile.username,
                    userName: profile._json.login , email: profile._json.email,
                    birthDate: profile._json.created_at, password: " ",
                })
                console.log(result);
                return done(null,result)
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