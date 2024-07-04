import { createContext } from "react";
import {react,useContext,useEffect,useState} from "react";
import { checkSession,logOut } from "./components/api";

const AuthContext=createContext();

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