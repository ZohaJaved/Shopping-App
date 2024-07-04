import React,{useContext} from "react";
import './SideNav.css';
import * as FaIcons from "react-icons/fa6";
import * as AiIcons from "react-icons/io5";
import { Link } from "react-router-dom";
import {SidebarData} from './SidebarData';
import SidebarContext from './Context/SidebarContext';


function SideNav(){
  const sidebarContext = useContext(SidebarContext) || { sidebar: false, setSidebar: () => {} };
  const { sidebar, setSidebar } = sidebarContext;
  
  function toggleSideBar(){
    if(sidebar==true){
      console.log("sidebar==",sidebar);
    setSidebar(false);}
    else{
      console.log("sidebar==",sidebar);
    setSidebar(true);}
  }
  
    return(
      <div className={sidebar ? 'nav-menu-active' : 'nav-menu'} sidenav>
        <div className="nav-menu-item" onClick={toggleSideBar}>
        {SidebarData.map((item,index)=>{
         return(
          <li key={index} className={item.cname}>
            <Link to={item.path}>
             {item.icon}
             <span>{item.title}</span>
            </Link>
            </li>
         )})}
         </div>
        </div>
    )
}
export default SideNav;