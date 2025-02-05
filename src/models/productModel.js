import { Schema, model } from "mongoose";
import paginate from 'mongoose-paginate-v2'

const productSchema = new Schema({
        title: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true
        },
        category: {
            type: String,
            require:true,
            index: true // indice 
        },
        price: {
            type: Number,
            require: true
        },
        status:{
            type: Boolean,
            default: true
        },
        stock: {
            type: Number,
            require: true
        },
        code: {
            type: String,
            require: true,
            unique: true
        },
        thumbnails: {
            type: Array,
            default: []
        }


})
productSchema.plugin(paginate)
const productModel = model('products', productSchema)

export default productModel