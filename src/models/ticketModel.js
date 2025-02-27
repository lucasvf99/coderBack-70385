import { model, Schema } from "mongoose";

const ticketSchema = new Schema ({
    code: {
        type:String,
        unique: true,
        require: true
    },
    purchase_datatime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        require: true
    },
    purchaser: {
        type: String,
        require: true
    },
    products: {
        type: Object,
        require: true
    }
})

const ticketModel = model('ticket', ticketSchema)
export default ticketModel