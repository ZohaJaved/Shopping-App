import express from "express";
import multer from "multer";
import { AddToCart,ModifyCart,getProductsInCart } from "../Controllers/CartController.js";

export const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/AddToCart', AddToCart);
// router.post('/ModifyCart/:number', ModifyCart);
router.post('/ModifyCart', ModifyCart);
router.get('/getProductsInCart',getProductsInCart)