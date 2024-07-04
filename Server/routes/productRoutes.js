import express from "express";
import multer from "multer";
import {getSubCategory,addProduct,getProducts,updateProduct,deleteProduct,getProductsByProductType,getProductQuantity,search,  FetchItemsToDisplay} from "../Controllers/productController.js"

export const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


console.log("productRoutes")
router.get('/getProductQuantity/:id', getProductQuantity);
router.get('/getSubCategories',getSubCategory)
router.post('/addProduct', upload.single('image'),addProduct)
router.get('/getProducts',getProducts)
router.put(`/updateProduct/:id`, updateProduct);
router.post(`/delProduct/:id`,deleteProduct);
router.get('/getProductsByProductType',getProductsByProductType)
router.get('/search/:searchTerm', search);
router.get(`/itemsToDisplay`,FetchItemsToDisplay);
