import React,{useContext, useEffect,useState} from 'react'
import "./ProductUserDisplay.css"
//import { festWear } from '../ProductBYCat/data';
import ProductContext from '../Context/ProductContext';
import Navbars from "../Navbars"
import Footer from "../Footer/Footer.jsx"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginContext from '../Context/LoginContext.js';
import { add_to_cart } from '../../state/features/cartSlicer.js';
import {useDispatch, useSelector} from 'react-redux';
import { isEqual } from 'lodash';

function ProductUserDisplay() {
   const dispatch=useDispatch();
   const userContext=useContext(LoginContext);
   const navigate=useNavigate();
   const prodContext=useContext(ProductContext);
   const items=useSelector((state)=>state.product.fetchedItems);
  //  const productFetch=prodContext.productFetch;
   const [productFetch,setProductFetch]=useState(null);
   
   useEffect(()=>{
    if(!isEqual(items,productFetch)){
      console.log("items in productUserDisplay",items)
      setProductFetch(items); 
    }
   },[items])

  //  const setProductFetch=prodContext.setProductFetch;
   console.log("productUserDisplay==+++++",items)
   const productToDisp = productFetch || []; // Initialize to an empty array if productFetch is falsy
   const navElements=['Cart','Orders','Account']
   const [cart,setCart]=useState();
   const [renderKey, setRenderKey] = useState(0); // Use a state variable to force re-renders

   useEffect(() => {
    // Increment the renderKey whenever productFetch changes
    setRenderKey(prevKey => prevKey + 1);
}, [productFetch]);

   const addToCart = (productDetails) => {
    dispatch(add_to_cart({productDetails, quantityIncrement: 1}))
    // Your addToCart logic here
    // axios.post(`http://localhost:3001/cart/AddToCart/1`, {
    //   productDetails: productDetails,
    //   // Assuming you have userDetails stored in some context
    //   email: userContext.userDetails.email
    // })
    // .then(response => {  
      
    //   if (response && response.error.status === 404)
    //     navigate("/");
    // })
    // .catch(error => {
    //   console.error("Error adding product:", error);
    // });
  };



 

    return (
        <section className='section' >
          <Navbars navElements={navElements}/>
          {/* {console.log("====",productToDisp.length===0)} */}
          { productFetch&& productFetch.length===0&&<h3 style={{textAlign:'center'}}>No products available </h3>}
         <div className='productType' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         
    </div>
            <div className='container' >
            
         { productFetch && productFetch.map((object)=>{
            
            return(
                  <div className="items"  >
                    <div className="img img1">
                        <img src={object.image} alt="object.name" />
                    </div>
                    <div className="name" style={{color:'black'}}>{object.productName}</div>
                    <div className="price">₹{object.productPrice}</div>
                    <div className="des" style={{ color: 'black' }}>{object.description}</div>
                    <button className='addToCart' onClick={()=>addToCart(object)}>Add to cart</button>
                  </div>
            )
         })}
         </div>
      
        </section>
      )
    }
    export default ProductUserDisplay;
    
