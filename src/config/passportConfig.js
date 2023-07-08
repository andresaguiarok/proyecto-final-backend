const passport = require("passport")
const GitHubStrategy = require("passport-github2")
const { userService } = require("../service/services.js")
require("dotenv").config()

const initPassportGithub = () => {
    passport.use("github", new GitHubStrategy({
        clientID: process.env.GITHUB_KEY_CLIENTID,
        clientSecret: process.env.GITHUB_KEY_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            let user = await userService.getUser({email: profile._json.email})
            
            if(!user.email){
                let result = await userService.createUser({
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
        let user = await userService.getUser({_id: id})
        done(null,user)
    }))
}

module.exports = {
    initPassportGithub
}