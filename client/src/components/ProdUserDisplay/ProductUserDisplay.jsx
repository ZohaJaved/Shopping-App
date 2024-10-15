import React,{useContext, useEffect,useState} from 'react'
import "./ProductUserDisplay.css"
//import { festWear } from '../ProductBYCat/data';
import ProductContext from '../Context/ProductContext';
import Navbars from "../Navbar/Navbars.jsx"
import Footer from "../Footer/Footer.jsx"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginContext from '../Context/LoginContext.js';
import { add_to_cart } from '../../state/features/cartSlicer.js';
import {useDispatch, useSelector} from 'react-redux';
import { isEqual } from 'lodash';
import cartIcon from "../../navIcons/cart.svg"
import logoutIcon from "../../navIcons/logout.svg"
import orderIcon from "../../navIcons/orderIcon.svg"
import AccountIcon from "../../navIcons/person.svg"
import homeIcon from "../../navIcons/home.svg"


function ProductUserDisplay() {
   const dispatch=useDispatch();
   const userContext=useContext(LoginContext);
   const navigate=useNavigate();
   const prodContext=useContext(ProductContext);
   const items=useSelector((state)=>state.product.fetchedItems);
  //  const productFetch=prodContext.productFetch;
   const [productFetch,setProductFetch]=useState(null);
   const navElements=[{elementName:'Home',elementIcon:homeIcon},{elementName:'Cart',elementIcon:cartIcon},{elementName:'Orders',elementIcon:orderIcon},{elementName:'Log Out',elementIcon:logoutIcon}];

   
   useEffect(()=>{
    if(!isEqual(items,productFetch)){
      console.log("items in productUserDisplay",items)
      setProductFetch(items); 
    }
   },[items])

  //  const setProductFetch=prodContext.setProductFetch;
   console.log("productUserDisplay==+++++",items)
   const productToDisp = productFetch || []; // Initialize to an empty array if productFetch is falsy
   const [cart,setCart]=useState();
   const [renderKey, setRenderKey] = useState(0); // Use a state variable to force re-renders

   useEffect(() => {
    // Increment the renderKey whenever productFetch changes
    setRenderKey(prevKey => prevKey + 1);
}, [productFetch]);

   const addToCart = (productDetails) => {
    dispatch(add_to_cart({productDetails, quantityIncrement: 1}))
  };



 

    return (
        <section className='product-wrapper' >
          <Navbars navElements={navElements} showSearchbar={true}/>
          {/* {console.log("====",productToDisp.length===0)} */}
          { productFetch&& productFetch.length===0&&<h3 style={{textAlign:'center'}}>No products available </h3>}
         <div className='productType' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         
    </div>
            <div className='item-container' >
            
         { productFetch && productFetch.map((object)=>{
            
            return(
              <div className="item" onClick={()=>navigate('/productDetailsPage',{state:{object}})} >
              <div className="item-img">
                  <img src={object.productImages[0].original} alt={object.productName} style={{height:'100%', width:'100%'}} />
              </div>
              <div className="product-title" style={{ height: "100%" }}>{object.productName}</div>
              <div className="product-price" style={{color:'gray'}}>Price: ₹{object.discountedPrice}</div>
              {/* <button className='addToCart'  onClick={()=>{handleClick(object,1)}}>Add to cart</button> */}
            </div>
            )
         })}
         </div>
        <footer/>
        </section>
      )
    }
    export default ProductUserDisplay;
    
