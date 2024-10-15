import UserModel from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
import { checkSession } from "./apiController.js";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    console.error("JWT secret key is missing or undefined.");
    // Handle the error appropriately, such as throwing an exception or terminating the process.
}

export const registerNewUser = async (req, res) => {
    const { name, email, address, contact, password, accountType } = req.body.signUp;
    console.log("req.body", req.body.signUp);
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            console.log("User already exists");
            return res.status(409).send({ success: false, message: "User Already Exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            address,
            contact,
            password: hashedPassword,
            accountType
        });

        await newUser.save();
        console.log("User saved");
        return res.status(200).send({ success: true, message: "User Added" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "Error registering user", error });
    }
};

export const authenticateLogIn = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            console.log("Invalid credentials");
            return res.status(404).send({ success: false, message: 'Invalid Credentials' });
        }

        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            return res.status(500).send({ success: false, message: 'Invalid Credentials' });
        }

        req.session.user = user;
        delete req.session.user.password;
        req.session.sessionId = req.sessionID;
        await req.session.save();

        const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '1d' });
        return res.status(200).send({ success: true, message: "Login success", user, token, sessionId: req.session.sessionId });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'Error in login API', error });
    }
};
