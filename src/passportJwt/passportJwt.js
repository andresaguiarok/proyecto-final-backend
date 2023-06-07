const passport = require("passport")
const jwt = require("passport-jwt")
const objetConfig = require("../config/objetConfig.js")

const JWTStrategy = jwt.Strategy
const ExtratcJWT = jwt.ExtractJwt

const cookieExtratc = req => {
    let token = null
    if(req && req.cookies){
        token = req.cookies["CoderCookieToken"]
    }
    return token
}

const initPassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtratcJWT.fromExtractors([cookieExtratc]),
        secretOrKey: objetConfig.JwtKeySecret
    }, async(jwt_payload,done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))
}

module.exports = initPassport