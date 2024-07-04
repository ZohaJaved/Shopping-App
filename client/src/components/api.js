import axios from "axios"
import { useState } from "react"
export const checkSession=async()=>{
    
    // console.log("inside api.js ,checksSession")
    try{
        const response=await axios.get('http://localhost:3001/api/checkSession',{
            withCredentials:true//ensure cookies are sent with the request
        })
        console.log("response in api.js",response)
        // setUserCart(response.data.userCart)
        return response.data.loggedIn;
    }catch(error){
        console.error('Error checking session',error);
        return {loggedIn:false}
    }
}
export const logOut=async()=>{
    console.log("destroy session in api.js");
    try{
        const response=await axios.post('http://localhost:3001/api/destroySession');
        if(response.status===200){
            return {loggedIn:false}
        }
    }catch(error){
      console.log("error",error);
    }
}