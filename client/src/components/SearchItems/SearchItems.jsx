import React,{useContext, useEffect,useState} from 'react'
import "./SearchItems.css";
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import LoginContext from '../Context/LoginContext';
import axios from 'axios';
import Navbars from '../Navbar/Navbars.jsx';
import cartIcon from "../../navIcons/cart.svg"
import logoutIcon from "../../navIcons/logout.svg"
import orderIcon from "../../navIcons/orderIcon.svg"
import AccountIcon from "../../navIcons/person.svg"
import homeIcon from "../../navIcons/home.svg"
import { useDispatch,useSelector } from 'react-redux';
import { add_to_cart } from '../../state/features/cartSlicer.js';


function SearchItems(){
    const {searchedProducts,setSearchedProducts}=useContext(LoginContext);
    const userContext=useContext(LoginContext);
    console.log("productUserDisplay==+++++",searchedProducts)
    const navElements=[{elementName:'Home',elementIcon:homeIcon},{elementName:'Cart',elementIcon:cartIcon},{elementName:'Orders',elementIcon:orderIcon},{elementName:'Log Out',elementIcon:logoutIcon}];
    const dispatch=useDispatch();

      // const addToCart = (productDetails) => {
      //   // Your addToCart logic here
      //   axios.post(`http://localhost:3001/cart/AddToCart/1`, {
      //     productDetails: productDetails,
      //     // Assuming you have userDetails stored in some context
      //     email: userContext.userDetails.email
      //   })
      //   .then(response => {  
          
      //     if (response && response.error.status === 404)
      //       navigate("/");
      //   })
      //   .catch(error => {
      //     console.error("Error adding product:", error);
      //   });
      // };

      const addToCart = (productDetails) => {
        console.log("addToCart Dispatch",productDetails)
        dispatch(add_to_cart({productDetails, quantityIncrement: 1}))
      };
    
      return (
        <section className='section' >
          <Navbars navElements={navElements} showSearchbar={true}/>
          {console.log("====",searchedProducts.length===0)}
          {searchedProducts.length===0&&<h3 style={{textAlign:'center'}}>Loading..</h3>}
         <div className='productType' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         
    </div>
            <div className='container' >
            
         {searchedProducts &&searchedProducts.map((object)=>{
            
            return(
                  <div className="items"  >
                    <div className="img img1">
                        <img src={object.productImages[0].original} alt="object.name" />
                    </div>
                    <div className="name" style={{color:'black',left:'5rem',background:'gray'}}>{object.productName}</div>
                    <div className="price">₹{object.discountedPrice}</div>
                    <div className="des" style={{ color: 'black' ,fontSize:'0.5rem'}}>{object.description}</div>
                    <button className='addToCart' onClick={()=>addToCart(object)}>Add to cart</button>
                  </div>
            )
         })}
         </div>
     
        </section>
      )

}
export default SearchItems;