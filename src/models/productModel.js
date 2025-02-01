import { Schema, model } from "mongoose";
import paginate from 'mongoose-paginate-v2'

const productSchema = new Schema({
        title: {
            type: String,
            require: true,
        },
        description: {
            type:String,
            require: true
        },
        category: {
            type: String,
            require:true,
            index: true // indice 
        },
        price: {
            type:Number,
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
        thumbnail: {
            default: []
        }


})
productSchema.plugin(paginate)
const producModel = model('products', productSchema)

export default producModel