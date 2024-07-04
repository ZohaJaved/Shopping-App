import React,{useContext, useEffect,useState} from 'react'
import "./SearchItems.css";
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import LoginContext from '../Context/LoginContext';
import axios from 'axios';
import Navbars from '../Navbars';

function SearchItems(){
    const {searchedProducts,setSearchedProducts}=useContext(LoginContext);
    const userContext=useContext(LoginContext);
    const [cart,setCart]=useState();
    console.log("productUserDisplay==+++++",searchedProducts)
    const navElements=['Cart','Orders','Account']
    const navigate=useNavigate();

      const addToCart = (productDetails) => {
        // Your addToCart logic here
        axios.post(`http://localhost:3001/cart/AddToCart/1`, {
          productDetails: productDetails,
          // Assuming you have userDetails stored in some context
          email: userContext.userDetails.email
        })
        .then(response => {  
          
          if (response && response.error.status === 404)
            navigate("/");
        })
        .catch(error => {
          console.error("Error adding product:", error);
        });
      };
    
      return (
        <section className='section' >
          <Navbars navElements={navElements}/>
          {console.log("====",searchedProducts.length===0)}
          {searchedProducts.length===0&&<h3 style={{textAlign:'center'}}>Loading..</h3>}
         <div className='productType' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         
    </div>
            <div className='container' >
            
         {searchedProducts &&searchedProducts.map((object)=>{
            
            return(
                  <div className="items"  >
                    <div className="img img1">
                        <img src={object.image} alt="object.name" />
                    </div>
                    <div className="name" style={{color:'black',left:'5rem',background:'gray'}}>{object.productName}</div>
                    <div className="price">₹{object.productPrice}</div>
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