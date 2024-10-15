import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session, { Cookie } from 'express-session';
import cookieParser from "cookie-parser";
import morgan from "morgan";
import MongoStore from 'connect-mongo';
import {router as UserRoutes} from "./routes/UserRoutes.js"
import { router as categoryRoutes } from "./routes/categoryRoutes.js";
import { router as productRoutes } from "./routes/productRoutes.js";
import {router as cartRoutes} from "./routes/CartRoutes.js";
import {router as orderRoutes} from "./routes/OrderRoutes.js"
import {router as DelBoyRoutes} from "./routes/DelBoyRoutes.js"
import {router as apiRoutes} from "./routes/apiRoutes.js"
import categoryModel from './Model/catModel.js';
import Delivery from './Model/DelBoyModel.js';
import Razorpay from "razorpay";
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();


const app = express();
const port = process.env.Port;


app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use(express.json({ limit: '50mb' }));
app.set('trust proxy',1)
app.use(session({
    key:process.env.key,
    secret:process.env.SESSION_SECRET,
    resave:false,//session should not be saved to the store unless they have been modified
    saveUninitialized:false, // Don't create session until something stored
    cookie:{maxAge:14*24*60*60*1000,httpOnly:true,cookie:{secure:true}},
    store:MongoStore.create({
        mongoUrl:process.env.MONGODB_URL,
        collectionName:'sessions',
        ttl:14*24*60*60 //14 days
    })
}));

// })
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order',orderRoutes);
app.use('/delivery',DelBoyRoutes)
app.use('/user',UserRoutes);
app.use('/api',apiRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/orders',async(req,res)=>{
const {amount,currency,receipt}=req.body;

//Creating a razorpay instance
// This code creates a new Razorpay instance using your unique test key ID and secret. Think of this as setting up a connection to Razorpay with your credentials, so you can start processing payments.
const razorpay=new Razorpay({
    key_id:process.env.REACT_APP_RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_SECRET
})
console.log("Razorpay Key ID:", process.env.REACT_APP_RAZORPAY_KEY_ID);

const options={
    amount,
    currency,
    receipt,
    payment_capture:1
}
console.log("options",options);

try{
    const response=await razorpay.orders.create(options);
    res.json({
        order_id:response.id,
        currency:response.currency,
        amount:response.amount
    })

}
catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
}

})

app.post('/validate_signature',async(req,res)=>{
    const {razorpay_signature,razorpay_payment_id,razorpay_order_id: order_id}=req.body.response;
    console.log("req.body",req.body);

    // Create HMAC SHA256 signature using the Razorpay secret
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    // Note the pipe (|) between order_id and razorpay_payment_id
    sha.update(`${order_id}|${razorpay_payment_id}`);

    const digest=sha.digest("hex")
    console.log("order_id:", order_id);
    console.log("razorpay_payment_id:", razorpay_payment_id);
    console.log("Razorpay Secret", process.env.RAZORPAY_SECRET);
    console.log("Digest:", digest);
    console.log("Razorpay Signature:", razorpay_signature);
    if(digest===razorpay_signature){
        res.status(200).json({message:'Payment signature is valid'})
    }
    else{
        res.status(400).json({message:'Payment signature is not valid'})
    }
})


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });

categoryModel.createIndexes();






