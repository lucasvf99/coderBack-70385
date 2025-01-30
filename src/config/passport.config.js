import passport from 'passport'
import local from 'passport-local'
import userModel from '../models/userModel.js'
import { validatePassword, createHash } from '../utils/bcrypt.js'

const localStrategy = local.Strategy

const initializatePassport  = () => {


    passport.use('register', new localStrategy({passReqToCallback: true, usernameField: 'email', }, async (req, username, password, done)=> {
        try {
            console.log(req.body)
            const {first_name, last_name, age, email, password} = req.body
            const findUser = await userModel.findOne({email: email})
            console.log(findUser)
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

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async(id, done) => {
            const user = await userModel.findById(id)
            done(null, user)
    })
}

export default initializatePassport