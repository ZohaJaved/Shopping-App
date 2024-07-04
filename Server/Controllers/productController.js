import categoryModel from "../Model/catModel.js";
import Product from "../Model/productModel.js";
import mongoose from "mongoose";
import Cart from "../Model/CartModel.js";

export const getSubCategory=async (req,res) =>{
    const categoryName=req.query.category;
    console.log("category in productController",categoryName)
    try {
      const fetched_doc = await categoryModel.find({categoryName});
      const subCat_array=fetched_doc[0].subCategory;
     // console.log("subCat array",subCat_array)

      const subCat = subCat_array.map(subCat => subCat.name);
     // console.log("subCat fetched",subCat)
         res.json({ subCat });
    }
   catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
    }

  //get items by category 
  export const FetchItemsToDisplay=async(req,res)=>{
    const arg=req.query.arg;
    console.log("arg=",arg);
    try{
      const results=await Product.find(arg)
      console.log("results===",results.length);
      return res.status(200).json(results);
    }
    catch(error){
      console.log(error);
      return res.status(500).json({message:'Internal server error'})
    }
  }


    export const getProductsByProductType=async (req,res) =>{
      const productType=req.query.productType;
      const typeOrCat=req.query.typeOrCat;
     // console.log("productType in productController",productType)
      var fetched_doc=[];
      try {
        if(typeOrCat==='type'){
          const productType=req.query.productType;
         fetched_doc = await Product.find({productType});}
        else if(typeOrCat==='Cat'){
          const category=req.query.categoryName;
           fetched_doc = await Product.find({category});
         //  console.log("fetched_doc",fetched_doc)
        }
       // console.log("subCat array",fetched_doc)
           res.json({ fetched_doc });
      }
     catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
      }

export const addProduct=async(req,res) =>{
  const {productName,productPrice,description,category,quantity,shipping,discount,productType,image}=req.body;
  
 // console.log("req.body",req.body)
  const newProductData={
    productName,
    productPrice,
    description,
    category,
    quantity,
    shipping,
    discount,
    productType,
    image
  }
 
//console.log("newProductData",newProductData);
const newProduct=new Product(newProductData);
try{
  await newProduct.save();
  res.json(newProductData)
}
catch(error){
  res.status(500).json({ message: 'Internal server error' });
  console.log("error",error)
}
}

export const getProducts = async (req, res) => {
  try {
      const products = await Product.find();
      res.json({ products });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateProduct = async (req, res) => {
  console.log("/api/updateProduct");
  try{
    const updatedValue=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
    console.log("update value from server",updatedValue)
    return res.status(200).json({ message: 'updated successfully from the server side' });
  }
  catch(error){
    console.error(error);
  }
}

// Controller function
export const getProductQuantity = async (req, res) => {
 // console.log("req",req.params)
  const productId = req.params.id; // Access _id parameter
console.log("getProductQuantity", productId); // Log the product ID to verify
  try {
   
    // Query the Product model to find the product by its ID
    const product = await Product.findById(productId);

    if (product) {
      console.log("productQuantity",product.quantity)
      // If the product exists, send the quantity as a response
      res.status(200).json({ quantity: product.quantity });
    } else {
      // If the product doesn't exist, send a 404 error response
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    // If an error occurs during the request, send a 500 error response
    console.error('Error fetching product quantity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }}

//getProduct by search
export const search =async(req,res)=>{
  console.log("search",req.params.searchTerm)
  const searchTerm = req.params.searchTerm;

  try{
    // Use Product.find() with a query object to find products with a matching name
  const products = await Product.find({ productName: { $regex: searchTerm, $options: 'i' } });
  
  console.log("results",products[0].productName)
  // Send the found products as the response
  res.json(products);
 // console.log("results",results)
  
  }
  catch(error){
    console.log(error)
  }
}




export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  console.log("id",id);
  try {
  
      // Convert the ID to an ObjectId
      const objectId = new mongoose.Types.ObjectId(id);
      console.log("object id",objectId);
      // Find the subject by its ID
      const foundOne = await Product.findById(objectId);
  
      console.log(foundOne)
      if (!foundOne) {
        return res.status(404).json({ message: 'Category not found' });
      }
      // Use deleteOne with a filter based on the found document
      await Product.deleteOne({ _id: objectId });
  
      return res.status(200).json({ message: 'Deleted successfully from the server side' });
    } catch (error) {
      console.log("Error during deletion", error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  