import 'dotenv/config'
import passport from 'passport'
import local from 'passport-local'
import userModel from '../models/userModel.js'
import { validatePassword, createHash } from '../utils/bcrypt.js'
import GithybStrategy from 'passport-github2'
import jwt from 'passport-jwt'

const localStrategy = local.Strategy
//jwt
const JWTStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt

const cookieExtractor = (req) => {
    let token = null
    if(req && req.cookies){
        token = req.cookies['coderCookie']
    }
    return token
}

const initializatePassport  = () => {


    passport.use('register', new localStrategy({passReqToCallback: true, usernameField: 'email', }, async (req, username, password, done)=> {
        try {
            const {first_name, last_name, age, email, password} = req.body
            const findUser = await userModel.findOne({email: email})
            if(!findUser){
                const user = await userModel.create({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    age: age,
                    password: createHash(password)
                })
                return done(null, user)
            }else{  
                return done(null, false)
            }
            
        } catch (error) {
            console.log(error)
            done(error)
        }
    }) )


    passport.use('login', new localStrategy({usernameField:'email'}, async (username, password, done)=> {
        try {
            const user = await userModel.findOne({email:username})
            if(user && validatePassword(password, user.password))
                return done(null, user)
            else
                return done(null, false)    
            
        } catch (error) {
            done(error)
        }
    }))

    passport.use('github', new GithybStrategy({
        clientID: 'Iv23liwXJD7bQugbPVjG',
        clientSecret: process.env.SECRET_GITHUB,
        callbackURL: 'http://localhost:8080/api/session/githubcallback' 
    },async (accesToken, refreshToken, profile, done)=>{
        try {

            let user = await userModel.findOne({email: profile._json.email})
          
            if(!user){
                let newUser  = await userModel.create({
                    first_name: profile._json.name,
                    email: profile._json.email,
                    last_name: ' ',
                    age: 18,
                    password: '1234'
                })
                done(null, newUser)
            }else{
                done(null,user)
            }
        } catch (error) {
            console.log(error)
            done(error)
        }
    }) )

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.SECRET_JWT
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload.user) 
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async(id, done) => {
            const user = await userModel.findById(id)
            done(null, user)
    })
}

export default initializatePassport