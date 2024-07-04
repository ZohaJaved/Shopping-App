import {React,useState,useEffect} from "react";
import  axios from "axios";
import "./Product.css"
import ListProduct from "../ListProduct/ListProduct";
import Navbars from "../Navbars";

function Product() {
  const navElements=['Category','orders','Account','Logout']
  const [listProduct,setListProduct]=useState();
  const [addNewCategoryForm,setAddNewCategoryForm]=useState()
  const [categories,setCategories]=useState([]);  
  const [subCategories,setSubCategories]=useState([]); 
  const [product,setProduct]=useState({
    productName:'',
    productPrice:'',
    description:'',
    category:'',
    quantity: null,
    discount:null,
    shipping:null,
    discount:null,
    productType:'',
    image:''
});
   
 // Function to fetch categories from the API endpoint
 const fetchProducts = async () => {
  try {
      const response = await axios.get('http://localhost:3001/product/getProducts');
    //  console.log("products===",response.data.products)
      return response.data.products;
  } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
  }
};

//update product 
const updateProduct = async () => {
  try {
      const products = await fetchProducts(); // Assuming fetchCategories fetches categories from the server
      setListProduct(products); // Update state with the new list of products
  } catch (error) {
      console.error("Error updating categories:", error);

  }
};
    
useEffect(() => {
  const fetchData = async () => {
      try {
          const products = await fetchProducts(); // Call fetchCategories function
          setListProduct(products); // Update state with fetched categories
      } catch (error) {
          console.error('Error fetching categories:', error);
      }
  };

  fetchData(); // Call fetchData function when component mounts
}, []); // Run once when the component mounts


    function handleChange(event){
      event.preventDefault();
      console.log("handleChange called",event.target)
      const {name,value}=event.target;
  
      setProduct((prevValue)=>({
        ...prevValue,[name]:value
      })
      )
    //  console.log("handleChange",product)
     }

     const handlePhoto = (e) => {
      e.preventDefault();
      const file = e.target.files[0];
      console.log("file", file);
    
      const reader = new FileReader(); // Create the FileReader first
    
      reader.onload = function(event) {
      //  console.log("prevValue",event.target.result)
        setProduct({...product,image:event.target.result})
      
      };
      
    
      reader.readAsDataURL(file); // Read the file directly as a data URL
    };

        useEffect(() => {
        // Fetch categories from  API endpoint
        axios.get('http://localhost:3001/category/getCategories')
        .then(response => {setCategories(response.data.categories)
        console.log("response",response.data.categories)})
        .catch(error => console.error('Error fetching categories:', error));
        }, []); // Run once when the component mounts
 
       function getSubCategories(categoryName){
          
          console.log("getSubCategories",categoryName)
          //Fetch subcategories from server
          axios.get("http://localhost:3001/product/getSubCategories", {
          params: {
          category: categoryName
          }
          })
         .then(response =>{
          setSubCategories(response.data.subCat)
          console.log("response",response.data.subCat);
          })
          .catch(error =>console.error("Error fetching subCategories",error))
          }
          
       
        function handleSubmit(event){
          console.log("handleSubmit is being called")
           event.preventDefault();
           // Validate inputs
           if (!product.productName || !product.productPrice || !product.description || !product.category || !product.quantity || !product.discount ||  !product.image) {
           alert("Please input all the necessary inputs.");
           return; // Stop form submission if any field is missing
           }
           console.log("product.image+++",product.image)
            axios.post("http://localhost:3001/product/addProduct",product)
            .then(response =>{  
              console.log("Product added successfully:", response.data);
              updateProduct();
              setProduct({
                productName:'',
                productPrice:'',
                description:'',
                category:'',
                quantity: 0,
                discount:0,
                shipping:0,
                discount:0,
                productType:'',
                image:''
            })
            })
            .catch(error=>{
            console.error("Error adding product:", error);
          })
     
      }
      
    
      return (
        <div  >
<center>
  <Navbars navElements={navElements} />
      {addNewCategoryForm ? (
        
        <div  >
         <h3 >Fill the Product Details</h3>
          <form encType="multipart/form-data" style={{marginLeft:'35%'}} >
    <table >
      <tbody>
        <tr>
          <th><label for="productName">Enter Product Name</label></th>
          <td><input type="text" id="productName" name="productName" value={product.productName} onChange={handleChange} placeholder="Enter Product Name" required /></td>
        </tr>
        <tr>
          <th><label for="productPrice">Enter Product Price</label></th>
          <td><input type="number" min="0" id="productPrice" name="productPrice" value={product.productPrice} onChange={handleChange} placeholder="Enter Product Price" required /></td>
        </tr>
        <tr>
          <th><label for="description">Enter Product Description</label></th>
          <td><input type="text" id="description" name="description" value={product.description} onChange={handleChange} placeholder="Enter Product Description" required /></td>
        </tr>
        <tr>
          <th><label for="category">Choose a Category</label></th>
          <td>
            <select name="category" id="category" value={product.category} onChange={(event) => {getSubCategories(event.target.value); handleChange(event)}} required>
              <option value="">Select</option>
              {categories.map(category => (
                <option key={category._id} value={category.categoryName}>{category.categoryName}</option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <th><label for="quantity">Enter Quantity available</label></th>
          <td><input type="number" min="0" id="quantity" name="quantity" value={product.quantity} onChange={handleChange} placeholder="Enter Quantity" required /></td>
        </tr>
        <tr>
          <th><label for="image">Upload Image</label></th>
          <td><input type="file" id="image" accept=".png, .jpg, .jpeg" name="image" onChange={handlePhoto} required /></td>
        </tr>
        <tr>
          <th><label for="discount">Select Discount (in Percent)</label></th>
          <td>
            <select name="discount" id="discount" onChange={handleChange}>
              <option value="">Select</option>
              {(() => {
                var options = [];
                var i = 0;
                while (i <= 80) {
                  options.push(<option key={i} value={i}>{i}</option>);
                  i = i + 5;
                }
                return options;
              })()}
            </select>
          </td>
        </tr>
        <tr>
          <th><label for="productType">Choose a ProductType</label></th>
          <td>
            <select name="productType" id="productType" value={product.productType} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="FestWear">FestWear</option>
              <option value="WinterWear">Ethnic Wear</option>
              <option value="Trending Footwear">Trending Footwear  </option>
            </select>
          </td>
        </tr>
        <tr>
          <th></th>
          <td><input type="submit" name="submit" onClick={handleSubmit} value="Add Product" /></td>
        </tr>
        <button style={{alignItems:'center',marginLeft:'100%'}} className="list-item button"  onClick={() => setAddNewCategoryForm(false)}>Cancle</button>
        
      </tbody>
    </table>
  </form>
        </div>
       
      ) : <div className="addNewCategory"> <button className="list-item button" style={{border:'bold',borderColor:'black',overflow:'scroll'}}  onClick={() => setAddNewCategoryForm(true)}>Add New Product</button></div>}
      <hr/>
          <div className="productlist" style={{left:0}} >
            
            <h2>List of Products</h2>
            <table style={{width:'25%',alignItems:'self-start'}}>

            <thead>
              <tr className="th" >
              <th  >Id</th>
                  <th  >Name</th>
                  <th  >Category</th>
                  <th  >  Price</th>
                  <th  >Quantity</th>
                  <th  >Shipping</th>
                  <th  >Product Type</th>
                  <th  >Pic</th>
                  <th  >Discount</th>
                  <th  colSpan={2} data-sticky="right" >Action</th>
                </tr>
              </thead>
              <tbody>
                {listProduct && listProduct.length > 0 && listProduct.map((obj, key) => (
     
                    <ListProduct
                      categories={categories}
                      id={key + 1}
                      name={obj.productName}
                      price={obj.productPrice}
                      category={obj.category}
                      discount={obj.discount}
                      pic={obj.image}
                      shipping={obj.shipping}
                      quantity={obj.quantity}
                      prodDetails={obj}
                      _id={obj._id}
                      updateProduct={updateProduct}
                      // deleteProduct={deleteProduct}
                      productType={obj.productType}
                    />
                  
                ))}
              </tbody>
            </table>
            
          </div> 
          </center>
            </div>
        )
        
}
export default Product;
