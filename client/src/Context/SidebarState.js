import { useState } from "react";
import SidebarContext from './SidebarContext'

function SidebarState(props){

    function toggleSideBar(){
        console.log("toggleSideBar")
        if(sidebar==true){
          console.log("sidebar==",sidebar);
        setSidebar(false);}
        else{
          console.log("sidebar==",sidebar);
        setSidebar(true);}
      }

    const [sidebar, setSidebar] = useState(true);
    return(<SidebarContext.Provider value={{sidebar,setSidebar,toggleSideBar}}>
          {props.children}
          </SidebarContext.Provider>)}
export  default SidebarState;