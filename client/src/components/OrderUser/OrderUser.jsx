import React, { useEffect } from 'react'
import "./OrderUser.css"
import { useState,useContext } from 'react'
import axios from 'axios'
import Navbars from '../Navbars'
import Footer from '../Footer/Footer'
import LoginContext from '../Context/LoginContext'

 function OrderUser() {
  const userContext=useContext(LoginContext)
  const [orderDetails,setOrderDetails]=useState([])
  const navElements=['Home','Cart','Account','Logout']
  
  console.log("OrderUser",useContext.userDetails);
  console.log("email------------------",userContext.userDetails.email)

  async function fetchOrderDetails() {
    try {
      const response = await axios.get('http://localhost:3001/order/getUserOrderDetails', {
        params: {
            email: userContext.userDetails.email
        }
    });
    
       console.log("response===",response)
      setOrderDetails(response.data.usersOrder);
        // return response.data.usersOrder;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
    // try {
    //   const response = await axios.get('http://localhost:3001/order/getOrderDetails');
    //   //console.log("response.data:", response.data.orders); // Access the data in the resolved object
    //   setOrderDetails(response.data.orders)
    // } catch (error) {
    //   console.error(error);
    // }
  }
  useEffect(()=>{
    fetchOrderDetails()
  },[])
  
//console.log("fetchDetails",orderDetails)
return (
  <div>
    <Navbars navElements={navElements}/>
  <div style={{width:'90%'}}>
    <h2>Here is Your Order</h2>
    <table className='table'>
      <thead className="thead-dark">
        <tr style={{textAlign:'center'}}>
          <th scope="col" style={{textAlign:'center'}}>Product Name</th>
          <th scope="col" style={{textAlign:'center'}}>Price</th>
          <th scope="col" style={{textAlign:'center'}}>Quantity</th>
          <th scope="col" style={{textAlign:'center'}}>Amount</th>
          <th scope="col" style={{textAlign:'center'}}>Date Of Order</th>
          <th scope="col" style={{textAlign:'center'}}>Payment Mode</th>
          <th scope="col" style={{textAlign:'center'}}>status</th>
          <th scope="col" style={{textAlign:'center'}}>Message</th>
        </tr>
      </thead>
      <tbody>
        {orderDetails && orderDetails.map((object, key) => (
          <tr key={key}>
            <td>{object.productName}</td>
            <td>{object.productPrice}</td>
            <td>{object.quantity}</td>
            <td>{object.amount}</td>
            <td>{object.date}</td>
            <td>{object.paymentMode}</td>
            <td>{object.status}</td>
            <td>{object.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  </div>
);
};

export default OrderUser;