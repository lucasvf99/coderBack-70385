import 'dotenv/config'
import { hashSync, compareSync, genSaltSync } from "bcrypt";

export const createHash = (password) => hashSync(password, genSaltSync(parseInt(process.env.SALT)))

export const validatePassword = (passIngresada, passDBB) => compareSync(passIngresada, passDBB)