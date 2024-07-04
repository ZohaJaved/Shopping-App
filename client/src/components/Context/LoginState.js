import { useState,useEffect, useContext } from 'react'
import LoginContext from './LoginContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function LoginState(props){
    const [userDetails,setUserDetails]=useState('');
    const [sessionId,setSessionId]=useState();
    const [searchedProducts,setSearchedProducts]=useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Initial state is an empty string
    const [cartDetails,setCartDetails]=useState();
    const navigate=useNavigate();

    
    useEffect(() => {
        if (searchTerm) { // Check if searchTerm is truthy before proceeding
          async function fetchProducts() {
            try {
              const response = await axios.get(`http://localhost:3001/product/search/${searchTerm}`);
              console.log("response from server")
              setSearchedProducts(response.data);
             // console.log("searchedProducts", searchedProducts)
              // navigate('/searchItems');
            } catch (error) {
              console.error('Error searching:', error);
            }
          }
          
          fetchProducts();
        }
      }, [searchTerm, setSearchedProducts, navigate]); // Ensure all dependencies are included in the dependency array
      
    return(<LoginContext.Provider value={{userDetails,setUserDetails,searchedProducts,setSearchedProducts,searchTerm, setSearchTerm,sessionId,setSessionId}}>
        {props.children}
    </LoginContext.Provider>)
}
export default LoginState;
//this is taken from the line 17 
//     useEffect(()=>{
//         // Function to fetch products in cart from the server
//  const fetchProducts = async () => {
//  // console.log("email",userContext.userDetails.email)
//     try {
//       const response = await axios.get('http://localhost:3001/cart/getProductsInCart', {
//         params: {
//             sessionId:sessionId
//         }
//     });
    
//       //  console.log("products===",response.data.products)
//       //setProductsInCart(response.data.products);
//         return response.data.products;
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//         return [];
//     }
//   };
//   fetchProducts();
//     },[sessionId])

export const useUser = () => useContext(LoginContext);