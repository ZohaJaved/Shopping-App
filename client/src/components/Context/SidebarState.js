import { useState } from "react";
import SidebarContext from './SidebarContext'

function SidebarState(props){

    const [sidebar, setSidebar] = useState(true);
return(<SidebarContext.Provider value={{sidebar,setSidebar}}>
    {props.children}
    </SidebarContext.Provider>)}
    export  default SidebarState;