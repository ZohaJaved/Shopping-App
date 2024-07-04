import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Navbars from '../Navbars'
import CategoryUser from '../Category/CategoryUser'
import ProdByType from '../ProdByType/ProdByType.jsx'
import Footer from '../Footer/Footer.jsx'
import LoginContext from '../Context/LoginContext.js'
import { useDispatch } from 'react-redux';
import { fetchItemsToDisplay } from '../../state/features/productSlicer.js';

 function User() {
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const userContext=useContext(LoginContext);
    // userContext.userDetails&&console.log("userDetails==",userContext.userDetails)
    const navElements=['Cart','Orders','Account','Logout']
   userContext&& console.log("userDetails==",userContext.userDetails);
  
   

  return (
    <div>
      <Navbars navElements={navElements} searchbar='true'/>
      <CategoryUser  />
      <ProdByType productType="FestWear" heading='FestWear'/>
      <ProdByType productType="Ethnic Wear" heading='Ethnic Wear'/>
      <ProdByType productType="Trending Footwear" heading='Trending Footwear'/>
      <Footer/>
    </div>
  )
}
export default User;