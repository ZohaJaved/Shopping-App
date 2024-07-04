import mongoose from 'mongoose';

const deliveryBoy=({
    name:{type:String,required:true},
    email:{type:String,required:true},
    contactNum:{type:Number,required:true},
    userId:{type:String,required:true},
    password:{type:String,required:true}
})

const Delivery=mongoose.model("Delivery",deliveryBoy);
export default Delivery;