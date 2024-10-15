import React, { useEffect } from 'react'
import { useState,useContext } from 'react';
import axios from 'axios';
import "./ProductDetailsInCart.css"
import LoginContext from '../Context/LoginContext'
import { getProducts, modifyCart,updateBillSummary } from '../../state/features/cartSlicer';
import { useDispatch,useSelector } from 'react-redux';


 function ProductDetailsInCart(props) {
  const {userDetails}=useContext(LoginContext);
  const [quantityInCart,setquantityInCart]=useState(props.quantity)
  const [quantityProductAvail,setQuantityProductAvail]=useState()
  const [lowQuantityMessage,setLowQuantityMessage]=useState(false);
  const [quantityRequiredNotAvailable,setQuantityRequiredNotAvailable]=useState(null);
  const dispatch=useDispatch();
  

  const handleModifyCart = (productDetails, quantityIncrement) => {
    console.log("productDetails.quantity:", productDetails.quantity);
    console.log("Quantity Increment:", quantityIncrement);
    // Dispatch modifyCart action
    dispatch(modifyCart({ productDetails, quantityIncrement }));
    dispatch(updateBillSummary());
    getProductQuantity()
  };


  //fetching the product quantity from server
  const getProductQuantity = async () => {
  
    try {
      // console.log('Product ID:', props._id);
      // Make an HTTP GET request to your endpoint, passing the productId as a parameter
      const response = await axios.get(`http://localhost:3001/product/getProductQuantity/${props._id}`);

  
      // If the request is successful (status code 200), return the quantity from the response data
      if (response.status === 200) {
        setQuantityProductAvail(response.data.quantity);
        // Check if the quantity is less than 10
        if (quantityProductAvail&&quantityProductAvail < 10) {
          // console.log("quantity:", quantityProductAvail);
          setLowQuantityMessage("only few quantity left");
        }
      } else {
        // If the request is not successful, log an error message and return null
        console.error('Failed to fetch product quantity');
        return null;
      }
      
    } catch (error) {
      // If an error occurs during the request, log the error and return null
      console.error('Error fetching product quantity:', error.message);
      return null;
    }
  };
  
  useEffect(() => {
    getProductQuantity();
    
   if(props.quantity>quantityProductAvail){
    console.log("props.quantity>quantityProductAvail")
    setQuantityRequiredNotAvailable("Quantity Required not available")
   }
   else if(props.quantity<=quantityProductAvail){
    console.log("props.quantity<=quantityProductAvail")
    setQuantityRequiredNotAvailable(null);
   }
  }, [props._id,props]); // Add prevQuantityProductAvail as a dependency
  
  console.log("props.product",props.cartItems) 

  return (
    <div >
        <table className='table' style={{ pointerEvents: 'all !important' }}>
        <tbody>
    <tr>
      <td style={{  width: '70px' }}> <img style={{  width: '100%' }} src={props.image} /></td>
      <td>{props.name}</td>
      <td>₹{props.discountedPrice}</td>
      <td>
        <span onClick={(event)=>{
           console.warn("- button clicked")
          if(props.product.quantity&&props.product.quantity>1){
            console.log("props.product.quantity",props.product.quantity)
          handleModifyCart(props.product,-1);
            getProductQuantity();
        }}}
        style={{
          pointerEvents: 'all',
          padding: '10px',
          cursor: 'pointer', // Show hand cursor on hover
          transition: 'background-color 0.3s ease' // Smooth transition
        }}
          >-</span>
        <span>{props.quantity}</span>
      {!quantityRequiredNotAvailable&&<span onClick={(event)=>{
          if(props.product){
          handleModifyCart(props.product,1);}
         }}
         style={{
          pointerEvents: 'all',
          padding: '10px',
          cursor: ' pointer', // Show hand cursor on hover
          transition: 'background-color 0.3s ease' // Smooth transition
        }}
          >+</span>}
       
      </td>
    
      <td><svg  style={{ pointerEvents: 'all',cursor:"pointer" }} onClick={(event)=>{
        
        handleModifyCart(props.product,0);
        }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
       <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
       <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
     </svg></td>
     
    </tr>
    {quantityRequiredNotAvailable&&<span style={{fontSize:'0.6rem'}}>{quantityRequiredNotAvailable} </span>}
    {lowQuantityMessage&&<span style={{fontSize:'0.6rem'}}>Only few left </span>}
    </tbody>
        </table>
      
    </div>
  )
}
export default ProductDetailsInCart;