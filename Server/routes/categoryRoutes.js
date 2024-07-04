import express from 'express';
import {getCategories,addCategory,updateCategory,deleteCategory,getProductsByCategory} from "../Controllers/CategoryControllers.js"
import multer from 'multer';

export const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/getCategories', getCategories);
router.post('/categoryAdd', upload.single('image'), addCategory);
router.put(`/updateCategory/:id`, updateCategory);
router.post(`/delCategory/:id`,deleteCategory);
router.get('/getProductsByCategory',getProductsByCategory)
