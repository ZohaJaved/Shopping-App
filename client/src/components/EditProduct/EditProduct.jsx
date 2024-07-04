import React,{useContext,useState,useEffect} from 'react'
import ProductContext from '../Context/ProductContext';
import { useNavigate } from 'react-router-dom';
import CategoryContext from '../Context/CategoryContext';
import Navbars from '../Navbars';
import axios from 'axios';

 function EditProduct(props) {
    const navElements=['Category','Orders','Account','Logout']
    const catContext=useContext(CategoryContext);
    const categories=catContext.categories;
    const navigate=useNavigate(); 
    const [image,setImage]=useState();
    const [updateValue,setUpdatevalue]=useState();
    const ProdContext=useContext(ProductContext);
    const {EditingProduct,setEditingProduct}=ProdContext;
    console.log("categories in child component",props.categories)
    
    function handleInputChange(e){
        e.preventDefault();
        const { name, value } = e.target;
        console.log("handleInputChange")
        setEditingProduct(prevProduct => {return{ ...prevProduct, [name]: value }});
        
    }  

    const handlePhoto = (e) => {
      e.preventDefault();
      console.log("prevValue",EditingProduct.image)
      const file = e.target.files[0];
      console.log("file", file);
    
      const reader = new FileReader(); // Create the FileReader first
    
      reader.onload = function(event) {
        
        setImage(event.target.result)
        console.log("updated valuw",event.target.result)
      };
      
    
      reader.readAsDataURL(file); // Read the file directly as a data URL
    };

      async function updateClick(event) {
        event.preventDefault();
        if (!EditingProduct.productName || !EditingProduct.productPrice || !EditingProduct.category || !EditingProduct.quantity || !EditingProduct.discount || !EditingProduct.shipping || !EditingProduct.image) {
            alert("Please input all the necessary inputs.");
            return; // Stop form submission if any field is missing
            }

            let updatedValue = EditingProduct;
                updatedValue = { ...updatedValue, image: image };
            
            setUpdatevalue(updatedValue);
        }
    useEffect(() => {
        if (updateValue) {
            try {
                const id = EditingProduct._id;
                axios.put(`http://localhost:3001/product/updateProduct/${id}`, updateValue)
                     .then(response => {
                     console.log("updated successfully");
                      // Update EditingCategory with new image data
                     // setEditingCategory(updateValue); 
                     // setDisplayUpdateInfo(true)
                      })
                     
            } catch (error) {
                console.error(error);
            }
        }
    }, [updateValue]);

  return (
    <center>
      <Navbars navElements={navElements} />
    <div>
      <h2>Edit Product</h2>
        <table>
        <tr>
         <th >Name</th>
         <td>
        <input 
         style={{width:"350px"}}
        className="input"
          name="productName"
          value={EditingProduct.productName}
          onChange={handleInputChange}
        />
      </td>
         </tr>
         <tr>
         <th >Price</th>
         <td>
        <input 
         style={{width:"350px"}}
        className="input"
          name="productPrice"
          value={EditingProduct.productPrice}
          onChange={handleInputChange}
        />
      </td>
         </tr>
         <tr>
         <th >Category</th>
         <td>
              <select 
                name="category" 
                value={EditingProduct.category} 
                onChange={(event) => { handleInputChange(event)}}
              >
                <option >Select</option>
                {categories&&categories.map(category => (
                  <option key={category._id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
              </td>
              </tr>
              <tr>
             <th >Quantity</th>
             <td>
             <input 
             style={{width:"350px"}}
             className="input"
             name="quantity"
             value={EditingProduct.quantity}
             onChange={handleInputChange}
             />
            </td>
         </tr>
         <tr>
         <th >Shipping</th>
         <td>
        <input 
         style={{width:"350px"}}
        className="input"
          name="shipping"
          value={EditingProduct.shipping}
          onChange={handleInputChange}
        />
      </td>
         </tr>
         <tr>
         <th >Old pic</th>
         <td>
         <img src={EditingProduct.image}/>
      </td>
         </tr>
         <tr>
         <th >New pic</th>
         <td>
         <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="image"
                onChange={handlePhoto}
            />
      </td>
         </tr>
         <button className="button" onClick={updateClick} >Update</button>
         <button onClick={()=>navigate('/product')} className="button">Cancel</button>
        </table>
    </div>
    </center>
  )
 
}
export default EditProduct;
