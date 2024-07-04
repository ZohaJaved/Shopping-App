import React, { useEffect } from 'react'
import "./OrderManage.css"
import { useState } from 'react'
import Navbars from '../Navbars'
import axios from 'axios'

 function OrderManage() {
  const navElements=['Category','Products','Account','Logout']
  const [orderDetails,setOrderDetails]=useState([])
  const [editingOrder, setEditingOrder] = useState(null);
  const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered'];
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState('');
  const [message, setMessage] = useState('');

  const handleButtonClick = () => {
    // Call setEditingCategory with the Cat_details value
    setEditingOrder();
    // Navigate to "/edit-category" route
    
  };

  async function fetchOrderDetails() {
    try {
      const response = await axios.get('http://localhost:3001/order/getOrderDetails');
      console.log("response.data:", response.data.orders); // Access the data in the resolved object
      setOrderDetails(response.data.orders)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(()=>{
    fetchOrderDetails()
    fetchDeliveryOptions();
  },[])



async function fetchDeliveryOptions() {
    try {
        const response = await axios.get("http://localhost:3001/delivery/fetchDeliveryOptions");
        const deliveryOptionsFromBackend = response.data; // Accessing data property of the response
        console.log("deliveryOptionsFromBackend",deliveryOptionsFromBackend)
        // Assuming you have a function setDeliveryOptions to update state
        setDeliveryOptions(deliveryOptionsFromBackend.delBoysArray);
    } catch (error) {
        console.error(error);
    }
}

  
  const handleManageClick = (order) => {
    setEditingOrder(order);
    setSelectedStatus(order.status);
    setSelectedDelivery(order.delivery);
    setMessage(order.message);
  };

  const handleSaveChanges = async () => {

    try {
      // Call your API to update the order with new status, message, and delivery person
      await axios.put(`http://localhost:3001/order/updateOrder/${editingOrder._id}`, {
        status: selectedStatus,
        message: message,
        delivery: selectedDelivery
      });
      // After successfully updating, fetch the updated order details again
      await fetchOrderDetails();
      // Reset the editingOrder state
      setEditingOrder(null);
    } catch (error) {
      console.error(error);
    }
  };


console.log("fetchDetails",orderDetails)
return (
  <div >
    <center>
    <Navbars navElements={navElements} />
    <h3 >Manage Orders</h3>
    <table style={{width:'60%'}}>
      <thead >
        <tr>
          <th scope="col">Customer Name</th>
          <th scope="col">Contact Number</th>
          <th scope="col">Address</th>
          <th scope="col">Product Id</th>
          <th scope="col">Product Name</th>
          <th scope="col">Product Pic</th>
          <th scope="col">Quantity</th>
          <th scope="col">Amount </th>
          <th scope="col">Date of Order</th>
          <th scope="col">Message</th>
          <th scope="col">status</th>
          <th scope="col">Delivery</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {orderDetails && orderDetails.map((object, key) => (
          <tr key={key}>
            
            <td>{object.customerName}</td>
            <td>{object.contactNum}</td>
            <td>{object.address}</td>
            <td>{object.product_id}</td>
            <td>{object.productName}</td>
            <td><img style={{height:'3rem', width:'3rem'}} src={object.image} alt="Product Image" /></td>
            <td>{object.quantity}</td>
            <td>{object.amount}</td>
            <td>{object.date}</td>
            <td>
                {editingOrder && editingOrder._id === object._id ? (
                  <div>
                    {/* Editing controls */}
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                  </div>
                ) : (
                  object.message
                )}
              </td>
            <td>
                {editingOrder && editingOrder._id === object._id ? (
                  <div>
                    {/* Editing controls */}
                    <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                      {statusOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  object.status
                )}
              </td>
            
              <td>
                {editingOrder && editingOrder._id === object._id ? (
                  <div>
                    {/* Editing controls */}
                    <select value={selectedDelivery} onChange={(e) => setSelectedDelivery(e.target.value)}>
                      {deliveryOptions&&deliveryOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  object.delivery
                )}
              </td>
              <td>
                {editingOrder && editingOrder._id === object._id ? (
                  <div>
                    {/* Editing controls */}
                    <button onClick={handleSaveChanges} >Save Changes</button>
                  </div>
                ) : (
                  <button onClick={() => handleManageClick(object)}>Manage</button>
                )}
              </td>
          </tr>
        ))}
      </tbody>
    </table>
    </center>
  </div>
);
};

export default OrderManage;