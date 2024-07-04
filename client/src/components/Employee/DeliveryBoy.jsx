import React from 'react'
import axios from 'axios';
import  { useState, useEffect } from 'react';
import Navbars from '../Navbars';

function DeliveryBoy(props) {
  const statusOptions = ['Pending', 'Processing', 'Delivered'];
  const navElements=['Account','Help','Logout']
  const [empDetails, setEmpDetails] = useState(null);
  const [orderDetails,setOrderDetails]=useState([])
  const [selectedStatus, setSelectedStatus] = useState('');
  const [editingOrder, setEditingOrder] = useState(null);

  
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/delivery/getEmployeeDetails', {
          params: {
            email: props.email
          }
        });
        console.log("response.data",response.data)
        setEmpDetails(response.data);
        setOrderDetails(response.data.orders)
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    }
    useEffect(() => {
    fetchData();
  }, [props.email,editingOrder,selectedStatus]); // Run effect when props.email changes

  const handleManageClick = (order) => {
    setEditingOrder(order);
    setSelectedStatus(order.status);
  };

  const handleSaveChanges = async () => {

    try {
      // Call your API to update the order with new status, message, and delivery person
      await axios.put(`http://localhost:3001/order/updateOrder/${editingOrder._id}`, {
        status: selectedStatus,
      });
      
  
      // Reset the editingOrder state
      setEditingOrder(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
     
      <div >
    
    <Navbars navElements={navElements} />
    <div>
        {empDetails && <h3>Hello {empDetails.employeeName}</h3>}
      </div>
      <center>
    <h3 >Your tasks..</h3>
    <table style={{width:'60%'}}>
      <thead >
        
        <tr style={{textAlign:'center',margin:'0.2rem',padding:'0.2rem'}}>  
          <th scope="col">Order Id</th>
          <th scope="col">Customer Name</th>
          <th scope="col">Contact Number</th>
          <th scope="col">Address</th>
          <th scope="col">Amount Due</th>
          <th scope="col">Payment Mode</th>
          <th scope="col">status</th>
          <th scope="col">Action</th>
         
        </tr>
        
      </thead>
      <tbody>
        {orderDetails && orderDetails.map((object, key) => (
          <tr key={key}>
            <td>{object._id}</td>
            <td>{object.customerName}</td>
            <td>{object.contactNum}</td>
            <td>{object.address}</td>
            <td>{object.amount}</td>
            <td>{object.paymentMode}</td>
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
    </div>
  );
}
export default DeliveryBoy;