import React from 'react'
import { useState,useEffect,useContext } from 'react';
import axios from "axios";
import ProductContext from "../Context/ProductContext"
import { useNavigate } from 'react-router-dom';
import "./ProductList.css"

export default function ProductList() {

  const [listProduct, setListProduct] = useState();
  const [addNewCategoryForm, setAddNewCategoryForm] = useState();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const prodContext=useContext(ProductContext);

  const navigate=useNavigate();
  
  const [showProductInputForm,setShowProductInputForm]=useState(false);


  const handleEditProduct = (prodDetails) => {
    // Call setEditingCategory with the Cat_details value
    prodContext.setEditingProduct(prodDetails);
    // Navigate to "/edit-category" route
    navigate('/editProduct');
  };

  

  useEffect(() => {
    axios.get('http://localhost:3001/category/getCategories')
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  function getSubCategories(categoryName) {
    axios.get("http://localhost:3001/product/getSubCategories", {
      params: { category: categoryName }
    })
      .then(response => {
        setSubCategories(response.data.subCat);
      })
      .catch(error => console.error("Error fetching subCategories", error));
  }

  async function deleteProduct(id){
    //confirm before deleting
    const shouldDelete = window.confirm("Are you sure you want to delete this product?");
      
        if (!shouldDelete) {
          return;
        }
    console.log("id",id)
    try{
      const response=await axios.post(`http://localhost:3001/product/delProduct/${id}`)
      if (response.status===200){
        console.log("Product deletec from db")

       updateProduct();
      }
     }
     catch(error){
     console.error("error during deletion",error)
     }
    }


    // Function to fetch categories from the API endpoint
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/product/getProducts');
      console.log("response====",response);
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };

    // Update product
    const updateProduct = async () => {
        try {
        const products = await fetchProducts();
        setListProduct(products);
        } catch (error) {
        console.error("Error updating products:", error);
        }
      }

      const handleButtonClick = (prodDetails) => {
        // Call setEditingCategory with the Cat_details value
        prodContext.setEditingProduct(prodDetails);
        // Navigate to "/edit-category" route
        navigate('/editProduct');
      };

      async function deleteProduct(id){
        //confirm before deleting
        const shouldDelete = window.confirm("Are you sure you want to delete this product?");
          
            if (!shouldDelete) {
              return;
            }
        console.log("id",id)
        try{
          const response=await axios.post(`http://localhost:3001/product/delProduct/${id}`)
          if (response.status===200){
            console.log("Product deletec from db")
    
           updateProduct();
          }
         }
         catch(error){
         console.error("error during deletion",error)
         }
        }


      useEffect(()=>{
        updateProduct()
      },[])

      return (
        <>
          <h2 className="product-list-title">List of Products</h2>
          <div className="table-container">
            <table className="product-table">
              <thead>
                <tr>
                  <th className="sticky-header">S NO.</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Discounted Price</th>
                  <th>Base Price</th>
                  <th>Category</th>
                  <th>Discount</th>
                  <th>Sizes and Quantity</th>
                  <th colSpan={2} className="action-header">Action</th>
                </tr>
              </thead>
              <tbody>
                {listProduct && listProduct.length > 0 && listProduct.map((obj, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td><img src={obj.productImages[0].original} alt="Product" className="product-image" /></td>
                    <td>{obj.productName}</td>
                    <td>{obj.discountedPrice}</td>
                    <td>{obj.basePrice}</td>
                    <td>{obj.category}</td>
                    <td>{obj.discount}%</td>
                    <td>
                      {obj.sizes && obj.sizes.length > 0 ? (
                        obj.sizes.map((size, index) => (
                          <span key={index} className="size-quantity">
                            {size.size} ({size.quantity} unit)
                          </span>
                        ))
                      ) : (
                        <span className="no-sizes">No Sizes Available</span>
                      )}
                    </td>
                    <td><button className="action-button" onClick={() => handleButtonClick(obj)}>Edit Details</button></td>
                    <td><button className="action-button delete-button" onClick={() => deleteProduct(obj._id)}>DELETE</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
    }      