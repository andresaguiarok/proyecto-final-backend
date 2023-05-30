const passport = require("passport")
const passportLocal = require("passport-local")
const {userModel} = require("../dao/models/usersModel")
const { creaHash, validPassword } = require("../utils/bcryptHash")
const GitHubStrategy = require("passport-github2")

const LocalStrategy = passportLocal.Strategy

const initPassport = () => {
    //Estrategia para register
    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email"
    }, async(req, username , password, done) =>{
        const {firtsName, lastName, userName} = req.body
        try {
            let userDb = await userModel.findOne({email: username})
            
            if(userDb) return done(null, false)

            let newUser = { firtsName, lastName, userName, email:username, password: creaHash(password) }

            const result = await userModel.create(newUser)

            return done(null, result)
        } catch (error) {
            return done("error al obtener un usuario"+error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser((async (id, done) => {
        let user = await userModel.findOne({_id: id})
        done(null,user)
    }))

    //EStrategia para login
    passport.use("login", new LocalStrategy({
        usernameField: "email",
    }, async(username, password, done) =>{
        const userDB = await userModel.findOne({email: username})
        try {
            let role = "user"
            if(!userDB) return done(null, false)
    
            if(!validPassword(password, userDB)) return done(null, false)

            const user = {
                _id: userDB._id,
                firtsName: userDB.firtsName,
                lastName: userDB.lastName,
                email: userDB.email,
                userName: userDB.userName,
                role: role
            }
            
            return done(null, user)
        } catch (error) {
            done(error)
        }
    }))
}

const initPassportGithub = () => {
    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.074f6975ae606894",
        clientSecret: "82e8f051f89e3c993b8868683e07f598aa9b5384",
        callbackURL: "http://localhost:8080/api/session/githubcall",
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let role = "user"
            let user = await userModel.findOne({email: profile._json.email})
            if(!user){
                let newUser = {
                    firtsName: profile._json.name,
                    lastName: profile.username,
                    userName: profile._json.login ,
                    email: profile._json.email,
                    password: '',
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
                role: role
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
    initPassport,
    initPassportGithub
}