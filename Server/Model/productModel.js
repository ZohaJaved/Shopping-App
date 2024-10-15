import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    productName:{type:String,required:[true]},
    productDescription:{type:String,required:[false]},
    basePrice:{type:Number,required:[true]},
    discountedPrice:{type:Number,required:[true]},
    category:{type:String,required:[false]},
    sizes:{type:Array,required:[false]},
    shipping:{type:Number,required:[false]},
    tags:{type:Array,required:[true]},
    discount:{type:Number,required:[true]},
    productType:{type:String,required:[false]},
    brand:{type:String,required:[false]},
    weight:{type:'String',required:[false]},
    sku: {
        type: String,
        required: false
    },    
    colors:[{
        colorName:{type:String,
            required:[false]},
        imageUrl:{type:String,contentType:String,
            required:[false],
            metadata:{
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
        }
    ],
    productImages: [{
        original:{
            type:String,
            required:[true],
            metadata:{
                fieldname:String,
                originalname:String,
                encoding:String,
                mimetype:String,
                destination:String,
               filename:String,
               path:String,
               size:Number 
            }
        },
        thumbnail:{
            type:String,
            required:[true],
            metadata:{
                fieldname:String,
                originalname:String,
                encoding:String,
                mimetype:String,
                destination:String,
               filename:String,
               path:String,
               size:Number 
            }
        }
    }],
})



const Product=mongoose.model("Product",productSchema);
export default Product;