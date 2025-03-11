import { useEffect, useState } from "react";
import ProductContext from './ProductContext'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ProductState(props){
    const [EditingProduct,setEditingProduct]=useState(false);
    const [catName,setCatName]=useState('');
    const[typeName,setTypeName]=useState('');
    const [productFetch,setProductFetch]=useState(null);//product fetch by productType
    const navigate=useNavigate();
    
    useEffect(() => {
        
            // Reset productFetch and fetch products based on updated catName or typeName
            setProductFetch(null);
            getProductsByProductsType(catName || typeName);
            if(typeName)
            setCatName(null)
            if(catName){
                setTypeName(null)
            }
        
    }, [catName, typeName]);
    
    const getProductsByProductsType=async (tOrC)=>{//t referrs to type(1) C refers to category (2)
        if (typeof setProductFetch === 'function') {
            
        // console.log('typeOrCat=====',catOrType);
        // console.log("productType",catOrType)

        if(typeName ){
            
            console.log("if(typeName&& tOrC== 1 )`{")
        //Fetch products based on type from server
        axios.get("http://localhost:3001/product/getProductsByProductType", {
        params: {
        productType: typeName,//category or type depend on parent component
        typeOrCat:'type'
        }
        })
        .then(response => {
            setProductFetch(null); // Reset productFetch
            setProductFetch(response.data.fetched_doc); // Set productFetch with new data
        })
        
        .catch(error =>console.error("Error fetching products",error))
        return
    }
    else if(catName){
        console.log("if(catName&& tOrC== 2 ){")
        setProductFetch(null);
        //Fetch products based on category from server
        axios.get("http://localhost:3001/product/getProductsByProductType", {//here ProductType is categoryName
        params: {
        categoryName: catName,
        typeOrCat:'Cat'//to search category
        }
        })
        .then(response => {
            setProductFetch(null); // Reset productFetch
            setProductFetch(response.data.fetched_doc); // Set productFetch with new data
        })
        
        .catch(error =>console.error("Error fetching products",error))
    }

    }
    else {
        // Handle the case where setProductFetch is not yet initialized
        console.error("setProductFetch is not initialized");
        // Optionally, you can throw an error to halt execution
        // throw new Error("setProductFetch is not initialized");
    }
}
        
    

return(<ProductContext.Provider value={{EditingProduct,setEditingProduct,catName,setCatName,typeName,setTypeName,productFetch,setProductFetch,getProductsByProductsType}}>
{props.children}
</ProductContext.Provider>)}
export  default ProductState;