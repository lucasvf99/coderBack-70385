import {Router} from 'express'
import { getProducts, createProduct } from '../controllers/products.controllers.js'

const productsRouter = Router()

productsRouter.get('/', getProducts )
productsRouter.post('/createproduct', createProduct )



export default productsRouter