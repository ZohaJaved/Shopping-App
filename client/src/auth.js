import { createContext } from "react";
import {react,useContext,useEffect,useState} from "react";
import { logOut } from "./components/api";
import axios from "axios"

const AuthContext=createContext();

 const checkSession=async()=>{

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

//Create a provider component
export const AuthProvider=({children}) =>{
    const [loggedIN,setLoggedIN]=useState(false);
    
    //check if user is login or not 
    const verifySession=async()=>{
        const result=await checkSession();
        console.log("result==",result);
        // navigate("userHome");
        if(result===true){
          setLoggedIN(true);
          console.log("setLoggedIn is ",loggedIN)
        }
      }
      

    const destroySession=async()=>{
      const result=await logOut();
      console.log("destroySession");
      console.log("result==",result);
      if(result&&!result.loggedIn){
        console.log("setLoggedIn is ",result.loggedIn)
        setLoggedIN(false);
        console.log("setLoggedIn is ",loggedIN)
      }
    }
     //to check session 
     useEffect(()=>{
      // console.log("registration useEffect")
      verifySession();
      
    },[loggedIN]);

    return(
        <AuthContext.Provider value={{loggedIN,setLoggedIN,verifySession,destroySession}}>
            {children}
        </AuthContext.Provider>
    )
}
// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
  };    