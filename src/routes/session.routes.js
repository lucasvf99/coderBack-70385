import { Router } from "express";
import { datosUser, githubLogin, login, register, viewLogin,  viewRegister } from "../controllers/session.controllers.js";
import passport from "passport";
import {authorization} from '../config/middlewares.js'
const sessionRouter = Router()


sessionRouter.get('/viewlogin', viewLogin)
sessionRouter.get('/viewregister', viewRegister)
sessionRouter.post('/login', passport.authenticate('login'), login)
sessionRouter.post('/register', passport.authenticate('register'), register )
sessionRouter.get('/current', passport.authenticate('jwt',{session:false}), authorization('Admin'), async (req,res) => res.send(req.user) )
sessionRouter.get('/github', passport.authenticate('github',{scope:['user: email']}),async (req,res) => {} )
sessionRouter.get('/githubcallback', passport.authenticate('github',{failureRedirect: '/login'}), githubLogin )
sessionRouter.get('/datauser', datosUser)
export default sessionRouter