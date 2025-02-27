import {Router} from 'express'
import { getProducts, createProduct, updateProduct, deleteProduct, getProduct } from '../controllers/products.controllers.js'
import { authorization } from '../config/middlewares.js'

const productsRouter = Router()

productsRouter.get('/', getProducts )
productsRouter.get('/product/:pId', getProduct)
productsRouter.post('/createproduct', createProduct )
productsRouter.post('/updateproduct', authorization('Admin'), updateProduct)
productsRouter.post('/deleteproduct', authorization('Admin'), deleteProduct)

export default productsRouter