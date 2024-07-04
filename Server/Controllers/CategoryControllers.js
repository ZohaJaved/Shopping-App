import categoryModel from "../Model/catModel.js"
import mongoose from "mongoose";

export const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.json({ categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const addCategory = async (req, res) => {
    console.log("/api/categoryAdd",req.body);

    const categoryName = req.body.categoryName;
    const imageUrl = req.body.cat_image; // Get the imageURL from the request body
    // const subCategory = req.body.subCategory;

    // //to add subCategory to the database
    // if (categoryName && subCategory) {
    //     const subCat = { name: subCategory, image: imageUrl }; // Update to include imageUrl
    //     console.log("subcat image", image);
    //     categoryModel.updateOne(
    //         { categoryName },
    //         {
    //             $push: { subCategory: { $each: [subCat] } }
    //         }
    //     )
    //         .then(result => {
    //             console.log("Category updated:", result);
    //             // Handle successful update (optional)
    //         })
    //         .catch(err => {
    //             console.log("Error updating category:", err);
    //         });
    // } else {
        const newCategoryData = {
            categoryName,
            cat_image: imageUrl // Update to include imageUrl
        };
        console.log("newCategoryData.imageUrl---", newCategoryData.imageUrl);
        const newCategory = new categoryModel(newCategoryData);
        // Save new category to the database
        newCategory.save()
            .then(result => {
                console.log("Category added:", result);
                // Send response indicating success (optional)
                res.status(200).json({ message: "Category added successfully" });
            })
            .catch(err => {
                console.log("Error adding category:", err);
                // Send error response (optional)
                res.status(500).json({ error: "Failed to add category" });
            });
    }


export const updateCategory = async (req, res) => {
    console.log("/api/updateCategory");
    try{
      const updatedValue=await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
      console.log(updatedValue)
      return res.status(200).json({ message: 'updated successfully from the server side' });
    }
    catch(error){
      console.error(error);
    }
  }

  export const deleteCategory = async (req, res) => {
    const id = req.params.id;
    console.log("id",id);
    try {
    
        // Convert the ID to an ObjectId
        const objectId = new mongoose.Types.ObjectId(id);
        console.log("object id",objectId);
        // Find the subject by its ID
        const foundOne = await categoryModel.findById(objectId);
    
        console.log(foundOne)
        if (!foundOne) {
          return res.status(404).json({ message: 'Category not found' });
        }
        // Use deleteOne with a filter based on the found document
        await categoryModel.deleteOne({ _id: objectId });
    
        return res.status(200).json({ message: 'Deleted successfully from the server side' });
      } catch (error) {
        console.log("Error during deletion", error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    };


    export const getProductsByCategory=async (req,res) =>{
        const productType=req.query.category;
        console.log("productType in productController",productType)
        try {
          const fetched_doc = await Product.find({category});
          
          console.log("subCat array",fetched_doc)
    
          
             res.json({ fetched_doc });
        }
       catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
        }