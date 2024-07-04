import { useEffect, useState } from "react";
import SearchContext from './ProductContext'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function SearchState(props){
    const [searchedProducts,setSearchedProducts]=useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Initial state is an empty string
    const navigate=useNavigate();


    useEffect(() => {
        async function fetchProducts() { // Added parentheses for function parameters
          try {
            const response = await axios.get(`http://localhost:3001/product/search/${searchTerm}`);
         //   console.log("response from server")
            setSearchedProducts(response.data);
          //  console.log("searchedProducts", searchedProducts) // You might not see the updated value here immediately due to closure
            navigate('/searchItems');
          } catch (error) {
            console.error('Error searching:', error);
          }
        }
        
        fetchProducts(); // Call the fetchProducts function
      
      }, [searchTerm]);      

    return (<SearchContext.Provider value={{searchedProducts,setSearchedProducts,searchTerm,setSearchTerm}}>
        {props.children}
    </SearchContext.Provider>)} 
    export default SearchState;
