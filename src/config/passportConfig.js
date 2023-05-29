const passport = require("passport")
const passportLocal = require("passport-local")
const {userModel} = require("../dao/models/usersModel")
const { creaHash, validPassword } = require("../utils/bcryptHash")

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

            let newUser = {firtsName, lastName, userName, email:username, password: creaHash(password)}

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
        let role = "user"
        const userDB = await userModel.findOne({email: username})
        try {
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

module.exports = initPassport