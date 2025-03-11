import { useState,useEffect } from "react";
import CategoryContext from './CategoryContext'
import axios from "axios";

function CategoryState(props){
    

    useEffect(() => {
        // Function to fetch categories from the API endpoint
        const fetchCategories = async () => {
          try {
            const response = await axios.get('http://localhost:3001/category/getCategories');
            setCategories(response.data.categories);
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchCategories(); // Call fetchCategories only once when component mounts
      }, []);
const[categories,setCategories]=useState()
const [EditingCategory,setEditingCategory]=useState(false);
return(<CategoryContext.Provider value={{EditingCategory,setEditingCategory,categories}}>
{props.children}
</CategoryContext.Provider>)}
export  default CategoryState;