// import React from 'react'
// import {useContext} from 'react';
// import LoginContext from '../../Context/LoginContext.js';
// import Navbars from '../Navbar/Navbars.jsx'
// import "./AccountDetails.css"
// import accountIcon from "../../navIcons/person.svg"
// import cartIcon from "../../navIcons/cart.svg"
// import logoutIcon from "../../navIcons/logout.svg"
// import orderIcon from "../../navIcons/orderIcon.svg"
// import homeIcon from "../../navIcons/home.svg";

//  function AccountDetails() {
//     const navElements=[{elementName:'Home',elementIcon:homeIcon},{elementName:'Cart',elementIcon:cartIcon},{elementName:'Orders',elementIcon:orderIcon},{elementName:'Log Out',elementIcon:logoutIcon}];
//     const userContext=useContext(LoginContext);
//     console.log("userContext",userContext.userDetails)
//     const userDetails = JSON.parse(localStorage.getItem("user"));
  
//   return (
//     <div className="profile-container" style={{height:'100vh'}}>
//         <Navbars navElements={navElements} />
//         <div className="profile-table">
//             <div>
//             <div className="heading"><h2>Profile</h2></div>
//             <div className="table-items">
//                 <strong>Name:</strong>
//                 <span>{userDetails.name}</span>
//             </div>
//             <div className="table-items">
//                 <strong>Contact Number:</strong>
//                 <span>{userDetails.contact}</span>
//             </div>
//             <div className="table-items">
//                 <strong>Email Address:</strong>
//                 <span>{userDetails.email}</span>
//             </div>
//             <tr>
//                 <strong>Address:</strong>
//                     <th>
//                    House Number:
//                     </th>
//                     <td>
//                 {userDetails.address&&userDetails.address.houseNumber}
//                     </td>
//                     <th>
//                    Street:
//                     </th>
//                     <td>
//                 {userDetails.address&&userDetails.address.street}
//                     </td>
//                     <th>
//                    City:
//                     </th>
//                      <td>
//                 {userDetails.address&&userDetails.address.city}
//                     </td>
//                     <th>
//                    Country:
//                     </th>
//                     <td>
//                     {userDetails.address&&userDetails.address.country}
//                     </td>
//              </tr>
//             <button style={{margin:'0px auto'}} >Edit</button>
//             </div>
//         </div>
//     </div>
//     )
//     }
// export default AccountDetails;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbars from '../Navbar/Navbars.jsx';
import "./AccountDetails.css";
import accountIcon from "../../navIcons/person.svg";
import cartIcon from "../../navIcons/cart.svg";
import logoutIcon from "../../navIcons/logout.svg";
import orderIcon from "../../navIcons/orderIcon.svg";
import homeIcon from "../../navIcons/home.svg";

function AccountDetails() {
  const navElements = [
    { elementName: 'Home', elementIcon: homeIcon },
    { elementName: 'Cart', elementIcon: cartIcon },
    { elementName: 'Orders', elementIcon: orderIcon },
    { elementName: 'Log Out', elementIcon: logoutIcon }
  ];

  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', address: { houseNumber: '', street: '', city: '', country: '' } });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user/details', {
          withCredentials: true,
          params: {
            email: userInfo.email
          }
        });
        setUserDetails(response.data.user);
        setFormData(response.data.user);
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userInfo.email]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setFormData({ ...formData, address: { ...formData.address, [addressField]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:3001/user/update-details', formData, {
        withCredentials: true
      });
      setUserDetails(response.data.user);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user details:', error.message);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <img src="/Imgs/loader.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="profile-container" style={{ height: '100vh' }}>
      <Navbars navElements={navElements} />
      <div className="profile-table">
        <div>
          <div className="heading"><h2>Profile</h2></div>
          {userDetails ? (
            isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="table-items">
                  <strong>Name:</strong>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="table-items">
                  <strong>Contact Number:</strong>
                  <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
                </div>
                <div className="table-items">
                  <strong>Address:</strong>
                  <div>
                    <label>House Number:</label>
                    <input type="text" name="address.houseNumber" value={formData.address.houseNumber} onChange={handleChange} />
                  </div>
                  <div>
                    <label>Street:</label>
                    <input type="text" name="address.street" value={formData.address.street} onChange={handleChange} />
                  </div>
                  <div>
                    <label>City:</label>
                    <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} />
                  </div>
                  <div>
                    <label>Country:</label>
                    <input type="text" name="address.country" value={formData.address.country} onChange={handleChange} />
                  </div>
                </div>
                <button type="submit">Save</button>
              </form>
            ) : (
              <>
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
                <div className="table-items">
                  <strong>Address:</strong>
                  <span>House Number: {userDetails.address && userDetails.address.houseNumber}</span>
                  <span>Street: {userDetails.address && userDetails.address.street}</span>
                  <span>City: {userDetails.address && userDetails.address.city}</span>
                  <span>Country: {userDetails.address && userDetails.address.country}</span>
                </div>
                <button onClick={handleEdit}>Edit</button>
              </>
            )
          ) : (
            <div>User details not available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;
