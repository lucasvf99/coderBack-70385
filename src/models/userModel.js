import { Schema, model } from "mongoose";
import cartModel from "./cartModel.js";
const userSchema = new Schema ({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    age: {
        type: Number,
        require: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    password: {
        type: String,
        require: true
    },
    rol: {
        type: String,
        default: 'Usuario',
    },
})

userSchema.post('save', async function name (doc){
    try {
        if(!doc.cart){
            const newCart = await cartModel.create({products:[]})
            await model('user').findByIdAndUpdate(doc._id, {cart: newCart._id})
        }
        
    } catch (error) {
        console.log('Error al generar carrito', error)

    }
})

const userModel = model('user', userSchema)
export default userModel