import React, { useEffect } from "react";
import "./OrderUser.css";
import { useState, useContext } from "react";
import axios from "axios";
import Navbars from "../Navbar/Navbars.jsx";
import Footer from "../Footer/Footer";
import cartIcon from "../../navIcons/cart.svg";
import logoutIcon from "../../navIcons/logout.svg";
import homeIcon from "../../navIcons/home.svg";
import AccountIcon from "../../navIcons/person.svg";

function OrderUser() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const navElements = [
    { elementName: "Home", elementIcon: homeIcon },
    { elementName: "Account", elementIcon: AccountIcon },
    { elementName: "Cart", elementIcon: cartIcon },
    { elementName: "Log Out", elementIcon: logoutIcon },
  ];

  async function fetchOrderDetails() {
    const userDetail = JSON.parse(localStorage.getItem("user"));
    console.log("userDetail.email", userDetail.email);
    try {
      const response = await axios.get(
        "http://localhost:3001/order/getUserOrderDetails",
        {
          params: {
            email: userDetail.email,
          },
        }
      );

      setOrderDetails(response.data.usersOrder);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }
  useEffect(() => {
    fetchOrderDetails();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1500); 

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  if (!isReady) {
    return <><Navbars navElements={navElements} showSearchbar={true}/> <div className="loading-container">Loading...</div></>
  }  

  return (
    <div className="order-user" style={{ height: "100vh", width: "100%" }}>
      <Navbars navElements={navElements} />
      <div style={{ padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>Here is Your Orders</h2>
        <div style={{ overflowX: "auto" }}>
          <table
            className="table"
            style={{ margin: "0 auto", width: "100%", maxWidth: "100%" }}
          >
            <thead className="thead-dark">
              <tr style={{ textAlign: "center" }}>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Amount</th>
                <th scope="col">Date Of Order</th>
                <th scope="col">Payment Mode</th>
                <th scope="col">Status</th>
                <th scope="col">Message</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails &&
                orderDetails.map((object, key) => (
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
    </div>
  );
}

export default OrderUser;
