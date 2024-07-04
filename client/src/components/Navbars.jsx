import React, { useContext,useEffect,useState } from 'react'
import './Navbars.css'
import { BrowserRouter } from 'react-router-dom'; 
import { Link, NavLink } from 'react-router-dom';
import SidebarContext from './Context/SidebarContext';
import logo from './img/logo.jpeg'
import { FaBars } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginContext from "./Context/LoginContext"
import ProductContext from './Context/ProductContext';
import { useAuth } from '../auth';

    function Navbars(props) {
      const navigate=useNavigate();
      const [searchTerm, setSearchTerm] = useState('');
      const { sidebar, setSidebar } = useContext(SidebarContext) || { sidebar: false, setSidebar: () => {} };
      console.log("context",setSidebar);
      const loginContext=useContext(LoginContext);
      const prodContext=useContext(ProductContext);
      //useAuth to logout (destroy session)
      const {destroySession}=useAuth();
      
      console.log("context",loginContext);
      function toggleSideBar(){
        if(sidebar==true){
          console.log("sidebar==",sidebar);
        setSidebar(false);}
        else{
          console.log("sidebar==",sidebar);
        setSidebar(true);}
      }
    //handle search entry
    const handleChange = (e) => {
      e.preventDefault();
      const { value } = e.target;
      console.log("handleChange", value);
      // Ensure the length of the value is within the desired range
      if (value.length >= 0 && value.length <= 20) {
        setSearchTerm(value);
      }
    };
    
  
    //handle button click 
    const handleSearch = async () => {
      console.log("searchTerm",searchTerm)
      loginContext.setSearchTerm(searchTerm)
      navigate('/searchItems');
    };

      return (
        <div className='n-wrapper'>
            <div className="n-left">
        <div className='logo-container'> <img src={logo} alt="Company Logo" /> </div>   
        <div className="n-name">Kabeer Fashion</div>
        <Link to='#' className='menu-bars'>
         {props.displayToggle&&<FaBars onClick={toggleSideBar}/>}
        </Link>
        </div>
       
        {props.searchbar&&
        <>
        <div class="input-group">
        <input type="search" class="form-control rounded" placeholder="Search"  onChange={handleChange} value={searchTerm} aria-label="Search" aria-describedby="search-addon" />
        <button type="submit" class="btn btn-outline-primary" data-mdb-ripple-init onClick={handleSearch}>search</button>
      </div>
      </>
        // <form>
        // <input type="text" id="search-bar" name="q" onChange={handleChange} value={searchTerm} placeholder="Enter your search term"/>
        // <button type="submit" onClick={handleSearch}>Search</button>
        // </form>
    }
      <div className='n-right'>
        <div className='n-list'>
        <nav>
          <ul>
            {props.navElements.map(element=>{
              if(element==='Home'){
               // prodContext.setProductFetch(null);
                return(<li key={'home'} onClick={()=>navigate('/userHome')}>{element}</li>)}
              if(element==='Cart'){
                console.log("Cart-----",element)
              return(<li key={'Cart'}  onClick={()=>navigate('/cart')}>{element}</li>)}
              if(element==='Products'){
                return(<li key={'Products'}  onClick={()=>navigate('/product')}>{element}</li>)
              }
              if(element==='Category'){
                return(<li key={'Category'}  onClick={()=>navigate('/category')}>{element}</li>)
              }
              if(element==='Orders'){
                return(<li key={'Orders'}  onClick={()=>navigate('/OrderUser')}>{element}</li>)
              }
              if(element==='orders'){
                return(<li key={'orders'}  onClick={()=>navigate('/orderManage')}>{element}</li>)
              }
              if(element==='Logout'){
                console.log("logout-----")
                return(<li key={'Logout'}  onClick={()=>destroySession()}>{element}</li>)

              } 
              return(<li key={element._id}  >{element}</li>)
            })}
          </ul>
        </nav>
        </div>
        </div>
        </div>
        
      );
    }
  export default Navbars
 