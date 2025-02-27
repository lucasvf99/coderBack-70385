import express from 'express'
import sessionRouter from './session.routes.js'
import productsRouter from './products.routes.js'
import cartRouter from './cart.routes.js'
import { __dirname } from "../path.js";

const indexRouter = express.Router()

indexRouter.use('/', productsRouter)
indexRouter.use('/api/session', sessionRouter)
indexRouter.use('/api/cart', cartRouter)




export default indexRouter