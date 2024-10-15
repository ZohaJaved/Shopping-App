import axios from "axios"
import { useState } from "react"



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