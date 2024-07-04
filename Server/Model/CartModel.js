import mongoose from "mongoose";

const CartSchema=new mongoose.Schema({
    productName:{type:String,required:true},
    quantity:{type:Number,required:false},
    image: {
        type: String,
        contentType: String,
        required:true,
        metadata: {
            fieldname: String,
            originalname: String,
            encoding: String,
            mimetype: String,
            destination: String,
            filename: String,
            path: String,
            size: Number
        }
    },
    productPrice:{type:Number,required:true},
    discount:{type:Number,required:false},
    product_id:{type:String,required:true}
})
const Cart=mongoose.model("Cart",CartSchema);
export default Cart;