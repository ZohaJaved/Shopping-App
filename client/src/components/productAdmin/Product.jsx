import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import "./Product.css";
import ListProduct from "../ListProduct/ListProduct.jsx";
import AdminNavbar from "../Navbar/AdminNavbar.jsx";
import SideNav from "../SideNav.jsx";
import ProductList from "./ProductList.jsx";
import SidebarContext from "../Context/SidebarContext.js";

function Product() {
  const navElements = ['Category', 'Orders', 'Account', 'Logout'];
  const navigate=useNavigate()
  const SideBarContext=useContext(SidebarContext);
  const { sidebar, setSidebar } = SideBarContext;
  

  return (
    <center>
    <div>
      <AdminNavbar style={{ position: 'fixed', top: 0, width: '100%', zIndex: 999 }} />
      <div className="sideNavSection" style={{position:'relative'}}>
        <SideNav/>
      </div>
      <div className={`product-page-section ${sidebar ? 'blur' : ''}`} >
      <h1 className="product-heading">Products</h1>
      <button className="add-product-button" onClick={() => navigate('/productInput')}>ADD NEW PRODUCTS</button>
      <ProductList/>
      </div>
    </div>
    </center>
  )
}

export default Product;
