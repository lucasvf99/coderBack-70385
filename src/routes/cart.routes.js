import { Router } from "express";
import { checkout, createCart, deletCart, deleteProductCart, getCart,  insertProductCart, updateProductCart, updateQuantityProduct } from "../controllers/cart.controllers.js";
import {authorization} from '../config/middlewares.js'

const cartRouter = Router()

cartRouter.get('/:cId', getCart)
cartRouter.post('/createcart',authorization('Admin'), createCart)
cartRouter.post('/insertproduct/:cId/:pId', authorization('Usuario'), insertProductCart)
cartRouter.post('/checkout/:cId', authorization('Usuario'),  checkout)
cartRouter.post('/:cId', authorization('Admin'), updateProductCart)
cartRouter.post('/:cId/:pId', authorization('Admin'), updateQuantityProduct)
cartRouter.delete('/deleteproduct/:cId/:pId', authorization('Usuario'), deleteProductCart)
cartRouter.delete('/emptycart/:cId', authorization('Usuario'), deletCart)

export default cartRouter