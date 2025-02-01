import Router from 'express'
import { getProducts } from '../controllers/products.controllers.js'

const productsRouter = Router()

productsRouter.get('/', getProducts )



export default productsRouter