import { Schema, model } from "mongoose";

const cartSchema = new Schema ( {
    products: {
        type: [
            {
                id_prod: {
                    type: Schema.Types.ObjectId,
                    require: true,
                    ref:'products'
                },
                quantity:{
                    type:Number,
                    require:true,
                    default : 1
                }
            }
        ],
        default: []
    }
})
cartSchema.pre('findOne', function(){
    this.populate('products.id_prod').lean()
})

const cartModel = model('carts', cartSchema)
export default cartModel