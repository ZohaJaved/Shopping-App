import express from 'express'
import {confirmOrder,getOrderDetails,updateOrder,getUserOrderDetails} from "../Controllers/OrderController.js";
import multer from 'multer';

export const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/confirmOrder', upload.single('image'), confirmOrder);
router.get('/getOrderDetails',getOrderDetails)
router.get('/getUserOrderDetails',getUserOrderDetails)
router.put(`/updateOrder/:id`,updateOrder)