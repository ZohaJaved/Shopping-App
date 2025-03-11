import React,{useContext, useEffect,useState} from 'react'
import "./SearchItems.css";
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import LoginContext from '../../Context/LoginContext.js';
import axios from 'axios';
import Navbars from '../Navbar/Navbars.jsx';
import cartIcon from "../../navIcons/cart.svg"
import logoutIcon from "../../navIcons/logout.svg"
import orderIcon from "../../navIcons/orderIcon.svg"
import AccountIcon from "../../navIcons/person.svg"
import homeIcon from "../../navIcons/home.svg"
import { useDispatch,useSelector } from 'react-redux';
import { add_to_cart } from '../../state/features/cartSlicer.js';


// function SearchItems(){
//     const {searchedProducts,setSearchedProducts}=useContext(LoginContext);
//     const userContext=useContext(LoginContext);
//     console.log("productUserDisplay==+++++",searchedProducts)
//     const navElements=[{elementName:'Home',elementIcon:homeIcon},{elementName:'Cart',elementIcon:cartIcon},{elementName:'Orders',elementIcon:orderIcon},{elementName:'Log Out',elementIcon:logoutIcon}];
//     const dispatch=useDispatch();

      

//       const addToCart = (productDetails) => {
//         console.log("addToCart Dispatch",productDetails)
//         dispatch(add_to_cart({productDetails, quantityIncrement: 1}))
//       };
    
//       return (
//         <section className='section' >
//           <Navbars navElements={navElements} showSearchbar={true}/>
//           {console.log("====",searchedProducts.length===0)}
//           {searchedProducts.length===0&&<h3 style={{textAlign:'center'}}>Loading..</h3>}
//          <div className='productType' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         
//     </div>
//             <div className='container' >
            
//          {searchedProducts &&searchedProducts.map((object)=>{
            
//             return(
//                   <div className="items"  >
//                     <div className="img img1">
//                         <img src={object.productImages[0].original} alt="object.name" />
//                     </div>
//                     <div className="name" style={{color:'black',left:'5rem',background:'gray'}}>{object.productName}</div>
//                     <div className="price">₹{object.discountedPrice}</div>
//                     <div className="des" style={{ color: 'black' ,fontSize:'0.5rem'}}>{object.description}</div>
//                     <button className='addToCart' onClick={()=>addToCart(object)}>Add to cart</button>
//                   </div>
//             )
//          })}
//          </div>
     
//         </section>
//       )

// }
// export default SearchItems;

function SearchItems() {
  const { searchedProducts, setSearchedProducts, searchTerm } = useContext(LoginContext); 
  const [loading, setLoading] = useState(true); // State to manage loading
  const userContext = useContext(LoginContext);
  const navElements=[{elementName:'Home',elementIcon:homeIcon},{elementName:'Cart',elementIcon:cartIcon},{elementName:'Orders',elementIcon:orderIcon},{elementName:'Log Out',elementIcon:logoutIcon}];
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/product/search`, {
          params: { searchTerm: searchTerm }
        });
        setSearchedProducts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, [setSearchedProducts]);

  const addToCart = (productDetails) => {
    dispatch(add_to_cart({ productDetails, quantityIncrement: 1 }));
  };

  return (
    <section className='section'>
      <Navbars navElements={navElements} showSearchbar={true} />
      <div className='productType' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      </div>

      {loading ? (
        <div style={{ height:'100vh',display:'flex',alignItems:'center',justifyContent:'center' }}>
          <img src="Imgs/loader.gif" alt="Loading..." style={{ width: '100px', height: '100px'  }} />
        </div>
      ) : (
        <div className='container' style={{border:'none'}}>
          {searchedProducts.length === 0 ? (
            <h3 style={{ textAlign: 'center', color: 'red' }}>No Products Available</h3>
          ) : (
            searchedProducts.map((object) => (
              <div className="items" style={{backgroundColor:'#F6F6F6',border:'1px solid #E1E1E1',display:'flex',flexDirection:'column',gap:'5px',height:'75vh',backgroundColor:'#FFFFFF'}} key={object._id}>
                <div className="img img1">
                  <img src={object.productImages[0].original} alt={object.productName} />
                </div>
                <div className="product-title">
                  <span style={{ height: "100%" ,padding:'5px' }}>{object.productName}</span>
                </div>
                <div className="product-price">
                 <span >Price: ₹{object.discountedPrice}</span> 
                </div>

                <div className="des" style={{ color: 'black', fontSize: '0.5rem' }}>{object.description}</div>
                {/* <button className='addToCart' onClick={() => addToCart(object)}>Add to cart</button> */}
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default SearchItems;