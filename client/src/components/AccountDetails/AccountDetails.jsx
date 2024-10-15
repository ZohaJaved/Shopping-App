import React from 'react'
import {useContext} from 'react';
import LoginContext from '../Context/LoginContext.js';
import Navbars from '../Navbar/Navbars.jsx'
import "./AccountDetails.css"
import accountIcon from "../../navIcons/person.svg"
import cartIcon from "../../navIcons/cart.svg"
import logoutIcon from "../../navIcons/logout.svg"
import orderIcon from "../../navIcons/orderIcon.svg"
import homeIcon from "../../navIcons/home.svg";

 function AccountDetails() {
    const navElements=[{elementName:'Home',elementIcon:homeIcon},{elementName:'Cart',elementIcon:cartIcon},{elementName:'Orders',elementIcon:orderIcon},{elementName:'Log Out',elementIcon:logoutIcon}];
    const userContext=useContext(LoginContext);
    console.log("userContext",userContext.userDetails)
    const userDetails = JSON.parse(localStorage.getItem("user"));
  
  return (
    <div className="profile-container" style={{height:'100vh'}}>
        <Navbars navElements={navElements} />
        <div className="profile-table">
            <div>
            <div className="heading"><h2>Profile</h2></div>
            <div className="table-items">
                <strong>Name:</strong>
                <span>{userDetails.name}</span>
            </div>
            <div className="table-items">
                <strong>Contact Number:</strong>
                <span>{userDetails.contact}</span>
            </div>
            <div className="table-items">
                <strong>Email Address:</strong>
                <span>{userDetails.email}</span>
            </div>
            <tr>
                <strong>Address:</strong>
                    <th>
                   House Number:
                    </th>
                    <td>
                {userDetails.address&&userDetails.address.houseNumber}
                    </td>
                    <th>
                   Street:
                    </th>
                    <td>
                {userDetails.address&&userDetails.address.street}
                    </td>
                    <th>
                   City:
                    </th>
                     <td>
                {userDetails.address&&userDetails.address.city}
                    </td>
                    <th>
                   Country:
                    </th>
                    <td>
                    {userDetails.address&&userDetails.address.country}
                    </td>
             </tr>
            <button style={{margin:'0px auto'}} >Edit</button>
            </div>
        </div>
    </div>
    )
    }
export default AccountDetails;