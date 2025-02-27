import { Router } from "express";
import { checkout, createCart, deletCart, deleteProductCart, getCart,  insertProductCart, updateProductCart } from "../controllers/cart.controllers.js";
import {authorization} from '../config/middlewares.js'

const cartRouter = Router()

cartRouter.get('/:cId', getCart)
cartRouter.post('/createcart',authorization('Admin'), createCart)
cartRouter.post('/:cId/:pId', insertProductCart)
cartRouter.post('/:cId', authorization('Admin'), updateProductCart)
cartRouter.post('/:cId/:pId', authorization('Admin'), updateProductCart)
cartRouter.post('/checkout/:cId', checkout)
cartRouter.post('/:cId', authorization('Admin'), updateProductCart)
cartRouter.delete('/deleteproduct/:cId/:pId', authorization('Usuario'), deleteProductCart)
cartRouter.delete('/emptycart/:cId', authorization('Usuario'), deletCart)

export default cartRouter