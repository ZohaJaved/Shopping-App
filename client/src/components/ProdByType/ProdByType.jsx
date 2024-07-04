import React, { useContext,useEffect,useState } from 'react'
import axios from 'axios';
import { festWear } from './data';
import "./ProdByType.css"
import { useNavigate } from 'react-router-dom';
import ProductContext from '../Context/ProductContext';
import LoginContext from '../Context/LoginContext';
import { useDispatch,useSelector } from 'react-redux';
import { add_to_cart } from '../../state/features/cartSlicer';
import { fetchItemsToDisplay} from '../../state/features/productSlicer';

 function ProdByType(props) {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {typeName,setTypeName,getProductsByProductsType}=useContext(ProductContext);
  const [productToDisplay,setProductToDisplay]=useState();//list of 4 produts to display
  const userContext=useContext(LoginContext);

  const handleClick = (productDetails) => {
    console.log("productDetails",productDetails)
    dispatch(add_to_cart({ productDetails, quantityIncrement: 1 })); // Dispatch the action
  };

 //fetch the list of 4 produts from 
  useEffect(() => {
   const fetchProducts = async () => {
     try {
       const fetchedProducts =  axios.get("http://localhost:3001/product/getProductsByProductType", {//here ProductType is categoryName
       params: {
       productType: props.productType,
       typeOrCat:'type'//to search category
       }
       })
      .then(response =>{
       setProductToDisplay(response.data.fetched_doc.slice(0, 5))
      //  console.log("productFetch",response.data.fetched_doc);
         })
       .catch(error =>console.error("Error fetching products",error))
      
     } catch (error) {
       console.error("Error fetching products:", error);
       // Handle errors gracefully (e.g., display an error message)
     }
   };

   fetchProducts();
 }, [props.productType]);


  // useEffect(() => {
  //   if (typeName) {
  //     getProductsByProductsType(1);
  //     console.log("listProdType--------",typeName)
     
  //   }
  // }, [typeName]); 
  return (
    <section className='section1' >
     <div className='productType' style={{ display: 'flex', justifyContent: 'space-between' }}>
  <h2 style={{ textAlign: 'center', fontFamily: 'cursive', margin: 0,textAlign:'center',marginLeft:'8%',marginTop:'2%' }}>{props.heading}</h2>
  <button style={{left:'-5%'}} onClick={()=>{
   
    if(props.productType){
      
      const arg={productType:props.productType}
    {dispatch(fetchItemsToDisplay(arg))
    }
    navigate('/ProductUserDisplay')
  }}}>See All</button>
</div>
        <div className='container' >
     {productToDisplay&&productToDisplay.map((object)=>{
        // console.log('object',object)
        return(
              <div className="items"  >
                <div className="img img1">
                    <img src={object.image} alt="object.name" />
                </div>
                <div className="name">{object.productName}</div>
                <div className="price" style={{color:'gray'}}>Price: ₹{object.productPrice}</div>
                <button className='addToCart' style={{fontSize:'0.9rem',textAlign:'center'}} onClick={()=>{handleClick(object,1)}}>Add to cart</button>
              </div>
        )
     })}
     </div>
    </section>
  )
}
export default ProdByType;
