import express from "express";
import multer from "multer";
import { getOrderDetails,fetchDeliveryOptions,getEmployeeDetails } from "../Controllers/DelBoyController.js";

export const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

console.log("delboy routes")

router.get('/getEmployeeDetails',getEmployeeDetails)
router.get('/getOrderDetails',getOrderDetails)
router.get('/fetchDeliveryOptions',fetchDeliveryOptions)