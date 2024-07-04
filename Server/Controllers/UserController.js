import UserModel from "../Model/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import dotenv from 'dotenv'
// import { data } from "autoprefixer";
import dotenv from 'dotenv';
dotenv.config();
import crypto, { verify } from "crypto"
import { checkSession } from "./apiController.js";


const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    console.error("JWT secret key is missing or undefined.");
    // Handle the error appropriately, such as throwing an exception or terminating the process.
}



export const registerNewUser=async(req,res)=>{
    let {name,email,address,contact,password,accountType}=req.body.signUp;
    console.log("req.body",req.body.signUp)
    try{
        const existingUser=await UserModel.findOne({email})
        
        if(existingUser){
            console.log("user already exist")
            return res.status(409).send({ success: false, message: "User Already Exists" });
        }

        const salt=await bcrypt.genSalt(10)
     //   console.log("password,salt",password,salt)
        const hashedPassword=await bcrypt.hash(password,salt)

    
        console.log("password",password)
        const newUser=new UserModel({
            name,
            email,
            address,
            contact,
            password:hashedPassword,
            accountType
        });

        try{
            await newUser.save()
            console.log("user saved")
            return res.status(200).send({  success: true, message: "User Added" });

        }
        catch(error){
            console.log(error)
        }

       
}
catch(error){
    console.log(error)
}
}

export const authenticateLogIn = async (req, res) => {
    // console.log("secret key",process.env.JWT_SECRET);
    // console.log("req.body",req.body.email)
    // console.log("authenticateLogIn")
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        console.log("user",user)
        if (!user) {
            console.log("not authenticate user")
            return res.status(404).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }
        //compare password
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) {
            return res.status(500).send({
                success: false,
                message: 'Invalid Credentials',
               
            })
        }
        req.session.user=user;// store user information in the session
        console.log("req.session in userController",req.session);
        delete req.session.user.password;//dont store password in the session for security purpose
        // You can generate a session ID using the built-in functionality
        // The session middleware will handle session ID generation and management
        const sessionId=req.sessionID;
        // Store additional data (sessionId in this case) in the session object
        req.session.sessionId=sessionId;
       await req.session.save();
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        // console.log("req.session.user",req.session.user);
        // console.log("authenticate user",req.session.user)
        //send a response with a sessionId
        return res.status(200).send(({success:true,message:"Login success",user,token}))
       
        // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        // return res.status(200).send({
        //     success: true,
        //     message: 'Login Sucessfully',
        //     token,
        //     user,
        // })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login API',
            error
        })
    }
}