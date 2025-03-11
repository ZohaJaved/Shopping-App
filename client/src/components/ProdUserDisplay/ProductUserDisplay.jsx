// import React,{useContext, useEffect,useState} from 'react'
// import "./ProductUserDisplay.css"
// //import { festWear } from '../ProductBYCat/data';
// import ProductContext from '../Context/ProductContext';
// import Navbars from "../Navbar/Navbars.jsx"
// import Footer from "../Footer/Footer.jsx"
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import LoginContext from '../Context/LoginContext.js';
// import { add_to_cart } from '../../state/features/cartSlicer.js';
// import {useDispatch, useSelector} from 'react-redux';
// import { isEqual } from 'lodash';
// import cartIcon from "../../navIcons/cart.svg"
// import logoutIcon from "../../navIcons/logout.svg"
// import orderIcon from "../../navIcons/orderIcon.svg"
// import AccountIcon from "../../navIcons/person.svg"
// import homeIcon from "../../navIcons/home.svg"


// function ProductUserDisplay() {
//    const dispatch=useDispatch();
//    const userContext=useContext(LoginContext);
//    const navigate=useNavigate();
//    const prodContext=useContext(ProductContext);
//    const items=useSelector((state)=>state.product.fetchedItems);
//   //  const productFetch=prodContext.productFetch;
//    const [productFetch,setProductFetch]=useState(null);
//    const navElements=[{elementName:'Home',elementIcon:homeIcon},{elementName:'Cart',elementIcon:cartIcon},{elementName:'Orders',elementIcon:orderIcon},{elementName:'Log Out',elementIcon:logoutIcon}];

   
//    useEffect(()=>{
//     if(!isEqual(items,productFetch)){
//       console.log("items in productUserDisplay",items)
//       setProductFetch(items); 
//     }
//    },[items])

//   //  const setProductFetch=prodContext.setProductFetch;
//    console.log("productUserDisplay==+++++",items)
//    const productToDisp = productFetch || []; // Initialize to an empty array if productFetch is falsy
//    const [cart,setCart]=useState();
//    const [renderKey, setRenderKey] = useState(0); // Use a state variable to force re-renders

//    useEffect(() => {
//     // Increment the renderKey whenever productFetch changes
//     setRenderKey(prevKey => prevKey + 1);
// }, [productFetch]);

//    const addToCart = (productDetails) => {
//     dispatch(add_to_cart({productDetails, quantityIncrement: 1}))
//   };



 

//     return (
//         <section className='product-wrapper' >
//           <Navbars navElements={navElements} showSearchbar={true}/>
//           { productFetch&& productFetch.length===0&&<div style={{height:'100vh'}}><h3 style={{textAlign:'center',marginTop:'50px'}}>No products available </h3></div>}
//          <div className='productType' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         
//     </div>
//             <div className='item-container' >
            
//          { productFetch && productFetch.map((object)=>{
            
//             return(
//               <div className="item" style={{borderRadius:'2px',display:'flex',flexDirection:'column',gap:'5px'}} onClick={()=>navigate('/productDetailsPage',{state:{object}})} >
//               <div className="item-img">
//                   <img src={object.productImages[0].original} alt={object.productName} style={{height:'100%', width:'100%'}} />
//               </div>
//               <div style={{display:'flex' ,flexDirection:'column',gap:'5px'}}>
//               <div className="product-title" style={{ height: "100%" }}>{object.productName}</div>
//               <div className="product-price" style={{color:'gray'}}>Price: ₹{object.discountedPrice}</div>
//               </div>
//               {/* <button className='addToCart'  onClick={()=>{handleClick(object,1)}}>Add to cart</button> */}
//             </div>
//             )
//          })}
//          </div>
//         <footer/>
//         </section>
//       )
//     }
//     export default ProductUserDisplay;
    

import React, { useContext, useEffect, useState } from 'react';
import "./ProductUserDisplay.css";
import Navbars from "../Navbar/Navbars.jsx";
import Footer from "../Footer/Footer.jsx";
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../Context/LoginContext.js';
import { add_to_cart } from '../../state/features/cartSlicer.js';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import cartIcon from "../../navIcons/cart.svg";
import logoutIcon from "../../navIcons/logout.svg";
import orderIcon from "../../navIcons/orderIcon.svg";
import AccountIcon from "../../navIcons/person.svg";
import homeIcon from "../../navIcons/home.svg";

function ProductUserDisplay() {
  const dispatch = useDispatch();
  const userContext = useContext(LoginContext);
  const navigate = useNavigate();
  const items = useSelector((state) => state.product.fetchedItems);
  const [productFetch, setProductFetch] = useState([]); // Initialize to an empty array
  const [loading, setLoading] = useState(true); // Loading state

  const navElements = [
    { elementName: 'Home', elementIcon: homeIcon },
    { elementName: 'Cart', elementIcon: cartIcon },
    { elementName: 'Orders', elementIcon: orderIcon },
    { elementName: 'Log Out', elementIcon: logoutIcon }
  ];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true); // Set loading to true before fetching
  //     try {
  //       // Simulate an API call
  //       await new Promise(resolve => setTimeout(resolve, 1000));
  //       setProductFetch(items);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false); // Set loading to false after fetching is done
  //     }
  //   };

  //   fetchData();
  // }, [items]);

  useEffect(() => {
    setLoading(true);
    setProductFetch([]); // Immediately clear previous products to prevent flickering
  
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call delay
        setProductFetch(items); // Set new products after fetching
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [items]);
  
  
  

  const addToCart = (productDetails) => {
    dispatch(add_to_cart({ productDetails, quantityIncrement: 1 }));
  };

  return (
    <section className='product-wrapper' style={{backgroundColor:'#FFFFFF'}}>
      <Navbars navElements={navElements} showSearchbar={true} />
      {loading ? (
        // <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <img src="/Imgs/loader.gif" alt="Loading..." style={{ width: '100px', height: '100px' }} />
        </div>
      ) : (
        <>
          {productFetch.length === 0 ? (
            <div style={{ height: '100vh' }}>
              <h3 style={{ textAlign: 'center', marginTop: '50px' }}>No products available</h3>
            </div>
          ) : (
            <div className='item-container' >
              {productFetch.map((object) => (
                <div className="item" style={{backgroundColor:'#F6F6F6',border:'1px solid #E1E1E1', borderRadius: '2px', display: 'flex', flexDirection: 'column', gap: '5px',height:'75vh',backgroundColor:'#FFFFFF' }} onClick={() => navigate('/productDetailsPage', { state: { object } })} key={object._id}>
                  <div className="item-img">
                    <img src={object.productImages[0].original} alt={object.productName} style={{ height: '100%', width: '100%' }} />
                  </div>
                  {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <div className="product-title" style={{ height: "100%" }}>{object.productName}</div>
                    <div className="product-price" style={{ color: 'gray' }}>Price: ₹{object.discountedPrice}</div>
                  </div> */}
                  <div className="product-title">
                  <span style={{ height: "100%" ,padding:'5px' }}>{object.productName}</span>
                </div>
                <div className="product-price">
                 <span >Price: ₹{object.discountedPrice}</span> 
                </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <Footer />
    </section>
  );
}

export default ProductUserDisplay;
