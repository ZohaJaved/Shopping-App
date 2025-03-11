import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductContext from "../../Context/ProductContext"
import axios from 'axios';

 function ListProduct(props) {
    const navigate=useNavigate();

    const prodContext=useContext(ProductContext);
  const handleButtonClick = () => {
    // Call setEditingCategory with the Cat_details value
    prodContext.setEditingProduct(props.prodDetails);
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

       props.updateProduct();
      }
     }
     catch(error){
     console.error("error during deletion",error)
     }
    }
    
    return(( 
              <tr >
                <td   data-sticky="right">{props.id}</td>
                <td  >{props.name}</td>
                <td  >{props.category}</td>
                <td  >{props.discountedPrice}</td>
                <td   >{props.quantity}</td>
                <td  >{props.shipping}</td>
                <td  >{props.productType}</td>
                <td  ><img src={props.pic} style={{ height: '30px', width: '30px' }} /></td>
                <td  >{props.discount}%</td>
                <td  data-sticky="right"><button onClick={handleButtonClick}>Edit Details</button></td>
                <td  data-sticky="right"><button onClick={()=>deleteProduct(props._id)} >DELETE</button></td>
              </tr>
        
        ))}
export default ListProduct;
