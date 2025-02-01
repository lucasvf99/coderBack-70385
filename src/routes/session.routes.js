import { Router } from "express";
import { login, register, viewLogin,  viewRegister } from "../controllers/session.controllers.js";
import passport from "passport";

const sessionRouter = Router()


sessionRouter.get('/viewlogin', viewLogin)
sessionRouter.get('/viewregister', viewRegister)
sessionRouter.post('/login', passport.authenticate('login'), login)
sessionRouter.post('/register', passport.authenticate('register'), register )
sessionRouter.get('/current', passport.authenticate('jwt', {session:false}), (req,res) => res.send(req.user) )

export default sessionRouter