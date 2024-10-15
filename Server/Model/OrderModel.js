import mongoose from 'mongoose';


const OrderSchema=({
    user_id:{type:String,required:true},
    product_id:{type:String,required:true},
    productName:{type:String,required:true},
    customerName:{type:String,required:true},
    contactNum:{type:Number,required:true},
    discountedPrice:{type:Number,required:true},
    quantity:{type:Number,required:true},
    email:{type:String,required:true},
    image: {
        type: String,
        contentType: String,
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
    }
    ,
    amount:{type:Number,required:true},
    date:{type:String,required:true},
    paymentMode:{type:String,required:true},
    status:{type:String,required:false},
    message:{type:String,required:false},
    address:{type:String,required:true},
    delivery:{type:String,required:false}
})
const Order=mongoose.model("Order",OrderSchema);
export default Order;