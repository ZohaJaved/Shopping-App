import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    productName:{type:String,required:[true]},
    description:{type:String,required:[false]},
    productPrice:{type:Number,required:[true]},
    category:{type:String,required:[true]},
    quantity:{type:Number,required:[true]},
    shipping:{type:Number,required:[false]},
    discount:{type:Number,required:[true]},
    productType:{type:String,required:[false]},
    image: {
        type: String,
        contentType: String,
        required:[true],
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
})

const Product=mongoose.model("Product",productSchema);
export default Product;