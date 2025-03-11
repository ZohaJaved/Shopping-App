import express from "express";
import multer from "multer";
import {registerNewUser,authenticateLogIn,details, updateProfile} from "../Controllers/UserController.js"
// import { sessionChecker } from "../server.js";

export const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/registerNewUser",registerNewUser)
router.post("/authenticateLogIn",authenticateLogIn);
router.get("/details",details)
router.put("/update-details",updateProfile)