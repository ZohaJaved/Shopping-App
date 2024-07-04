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


const user={
    name:'Emily Brown',
    userId:'Emily123',
    contactNum:'9865754781',
    password:'emily@123'
  }

  const newDel=new Delivery(user);
  
 // newDel.save()
//   .then(savedDelivery => {
//     console.log('Delivery saved successfully:', savedDelivery);
//   })
//   .catch(error => {
//     console.error('Error saving delivery:', error);
//   });

//   //Delivery.Save({user})

const app = express();
const port = 3001;
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use(express.json({ limit: '50mb' }));
app.set('trust proxy',1)
app.use(session({
    key:'user_zoha',
    secret:'my_long_secret_key',
    resave:false,//session should not be saved to the store unless they have been modified
    saveUninitialized:false, // Don't create session until something stored
    cookie:{maxAge:14*24*60*60*1000,httpOnly:true,cookie:{secure:true}},
    store:MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017/shopping',
        collectionName:'sessions',
        ttl:14*24*60*60 //14 days
    })
}));
// app.use((req,res,next)=>{
//     if(req.session.user&&req.cookies.user_zoha){
//         res.redirect("userHome");
//     }
//     next();
// });
// export var sessionChecker=(req,res,next)=>{
//     console.log('sessionChecker middleware executed');
//     if(req.session.user && req.cookies.user_zoha){
//         console.log("req.session.user------/userHome",req.session.user)
//         res.redirect("/userHome");
//     }
//     else{
//         console.log("req.session.user======/userHome",req.session.user)
//         next();
//     }
// }
// app.get('/',sessionChecker,(req,res)=>{
//     res.redirect('/SignUp')
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


mongoose.connect('mongodb://127.0.0.1:27017/shopping')
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






