import { Router } from "express";
import { login, register, viewLogin, viewRegister } from "../controllers/session.controllers.js";
import passport from "passport";

const sessionRouter = Router()


sessionRouter.get('/viewlogin', viewLogin)
sessionRouter.get('/viewregister', viewRegister)
sessionRouter.post('/login', passport.authenticate('login'), login)
sessionRouter.post('/register', passport.authenticate('register'), register )

export default sessionRouter