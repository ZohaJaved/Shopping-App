import React,{useContext,useState,useEffect} from 'react'
import ProductContext from '../Context/ProductContext';
import { useNavigate } from 'react-router-dom';
import CategoryContext from '../Context/CategoryContext';
import Navbars from '../Navbar/Navbars.jsx';
import axios from 'axios';
import backIcon from "../img/backIcon.svg";
import "./EditProduct.css"

 function EditProduct(props) {
    const navElements=['Category','Orders','Account','Logout']
    const catContext=useContext(CategoryContext);
    const categories=catContext.categories;
    const navigate=useNavigate(); 
    const [image,setImage]=useState();
    const [updateValue,setUpdatevalue]=useState();
    const ProdContext=useContext(ProductContext);
    const {EditingProduct,setEditingProduct}=ProdContext;
    const [EditingSizes,setEditingSizes]=useState(EditingProduct.sizes);
    console.log("categories in child component",props.categories)
    
    function handleInputChange(e){
        e.preventDefault();
        const { name, value } = e.target;
        console.log("handleInputChange")
        setEditingProduct(prevProduct => {return{ ...prevProduct, [name]: value }});
        
    }  

    const handleSizeQuantityChange=(event,index)=>{
      event.preventDefault();
      const {value}=event.target;
        let updatedSizes=EditingProduct.sizes;
        updatedSizes[index]={
          ...updatedSizes[index],quantity:value
        }
        setEditingProduct((prev)=>({
          ...prev,sizes:updatedSizes
        }))
    console.log("EdittingSizes",EditingSizes)
    }

    const handleAddImages = (event)=> {
      event.preventDefault();

      const file=event.target.files[0];

      const reader= new FileReader();
      console.log("handleAddImages")

      reader.onload=function(event){
        console.log("onloadFunction");
        let updatedImages=[...EditingProduct.productImages]
        let newImage=reader.result;

        updatedImages.push({
          original:reader.result,
          thumbnail:reader.result
        });
        // console.log("updatedImages",updatedImages);
        setEditingProduct((prev)=>({
          ...prev,productImages:updatedImages
        }))
        console.log("editingProduct",EditingProduct);
      }    

     
      reader.readAsDataURL(file); // Read the file directly as a data URL
    }

    const handleReplacePhoto = (e,index) => {
      e.preventDefault();
  
      const file = e.target.files[0];
      console.log("file", file);
    
      // Use FileReader to read the file and convert it to base64 if needed
      const reader = new FileReader(); 
       
      reader.onload = function(event) {

        // Update the specific image in the productImages array
       let updatedImages=[...EditingProduct.productImages];
       updatedImages[index]={
        ...updatedImages[index],
        original:reader.result,
        thumbnail:reader.result
       }

       setEditingProduct((prev)=>({
        ...prev,productImages:updatedImages
       }))
        
      };
      
  
      reader.readAsDataURL(file); // Read the file directly as a data URL
    };

    function handleDeleteClick(event,index){
      
      const confirmDelete=window.confirm("Are you sure you want to delete this item")
      if(confirmDelete){
      event.preventDefault();
      let updatedImages=EditingProduct.productImages.filter((image,i)=>i!==index)
      console.log("updatedImages",updatedImages);
      setEditingProduct((prev)=>({
        ...prev,productImages:updatedImages
      }))
    }
    }

      async function updateClick(event) {
        event.preventDefault();
        if (!EditingProduct.productName || !EditingProduct.basePrice || !EditingProduct.discountedPrice || !EditingProduct.category  || !EditingProduct.discount ||  !EditingProduct.productImages) {
            alert("Please input all the necessary inputs.");
            return; // Stop form submission if any field is missing
            }

            let updatedValue = EditingProduct;
            console.log("updatedValue",updatedValue);
            setUpdatevalue(updatedValue);
        }
    useEffect(() => {
        if (updateValue) {
            try {
                const id = EditingProduct._id;
                console.log("updatedValue",updateValue);
                axios.put(`http://localhost:3001/product/updateProduct/${id}`, updateValue)
                     .then(response => {
                     console.log("updated successfully");
                     navigate('/product')
                     alert("updated Successful")

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
      <div className='heading'  onClick={() => navigate("/product")} >
      <img src={backIcon}   />
      <span>Back</span>
      </div>
      <h2>Edit Product</h2>
        <table>
        <tr>
         <th >Product Name</th>
         <td>
        <input 
          className="input"
          name="productName"
          value={EditingProduct.productName}
          maxLength={200}
          onChange={handleInputChange}
        />
      </td>
         </tr>
         <tr>
         <th >basePrice</th>
         <td>
        <input 
        className="input"
          name="basePrice"
          value={EditingProduct.basePrice}
          onChange={handleInputChange}
          maxLength={5}
        />
      </td>
      </tr>
      <tr>
         <th >Discounted Price</th>
         <td>
        <input 
        className="input"
          name="discountedPrice"
          value={EditingProduct.discountedPrice}
          onChange={handleInputChange}
          maxLength={5}
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
             <th >Discount in %</th>
             <td>
             <input 
             className="input"
             name="discount"
             value={EditingProduct.discount}
             onChange={handleInputChange}
             />
            </td>
         </tr>
         <tr>
         <th >Shipping</th>
         <td>
        <input 
        className="input"
          name="shipping"
          value={EditingProduct.shipping}
          onChange={handleInputChange}
        />
      </td>
         </tr>
         <tr>
         <th colSpan="2" >
           <span>Sizes</span>
         </th>
         </tr>      
         {EditingProduct.sizes&&EditingProduct.sizes.map((obj,index)=>(
          <React.Fragment key={index}>
            <tr>
              <th>
                {obj.size}
              </th>
              <td>
                <input
                type='text'
                sizeName={obj.size}
                value={obj.quantity}
                style={{width:'100%'}}
                onChange={(event)=>handleSizeQuantityChange(event,index)}
                />
              </td>
            </tr>
          </React.Fragment>
         ))}
         <tr>
          <th colSpan={2} >
            <span>Images</span>
          </th>
         </tr>
         {EditingProduct.productImages.map((image, index) => (
              <React.Fragment key={index}>
                <tr>
                  <th>Pic {index + 1}</th>
                  <td >
                    <img src={image.original} style={{width:'70%'}} alt={`Product ${index + 1}`}   />
                  </td>
                </tr>
                <tr>
                 <th>Replace Image</th>
                 <td >
                   <input
                     type="file"
                     accept=".png, .jpg, .jpeg"
                     name={`image${index}`}
                     onChange={(event) => handleReplacePhoto(event, index)}
                   />
                   <button onClick={(event)=>handleDeleteClick(event,index)}>Delete</button>
                 </td>
                </tr> 
              </React.Fragment>
            ))}
            <br/>
            {EditingProduct.productImages && EditingProduct.productImages.length <=5 && 
              <tr>
                <th>Enter More Images</th>
                <td>
                  <input
                  type='file'
                  accept=".png, .jpg, .jpeg"
                  onChange={handleAddImages}
                  />
                </td>
              </tr>
            }
            <center>
         <button className="button" onClick={updateClick} >Update</button>
         <button onClick={()=>navigate('/product')} className="button">Cancel</button>
         </center>
        </table>
    </div>
    </center>
  )
 
}
export default EditProduct;
