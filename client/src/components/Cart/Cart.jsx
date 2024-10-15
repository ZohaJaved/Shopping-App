import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import isEqual from "lodash.isequal";
import axios from "axios";
// import actionCreators from '../../state/index.js';
import LoginContext from "../Context/LoginContext";
import ProductDetailsInCart from "../ProductDetailsInCart/ProductDetailsInCart";
import {
  calculateBill,
  getProducts,
  updateBillSummary,
} from "../../state/features/cartSlicer.js";
import "./Cart.css";
import Navbars from "../Navbar/Navbars.jsx";
import cartIcon from "../../navIcons/cart.svg";
import logoutIcon from "../../navIcons/logout.svg";
import orderIcon from "../../navIcons/orderIcon.svg";
import homeIcon from "../../navIcons/home.svg";
import AccountIcon from "../../navIcons/person.svg";
// import Razorpay from "razorpay";
// import logo from "../img/logo.jpeg";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const navElements = [
    { elementName: "Home", elementIcon: homeIcon },
    { elementName: "Account", elementIcon: AccountIcon },
    { elementName: "Orders", elementIcon: orderIcon },
    { elementName: "Log Out", elementIcon: logoutIcon },
  ];
  const [productsInCart, setProductsInCart] = useState(null);
  const [Bill, setBill] = useState();


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSuccess = useSelector((state) => state.cart.isSuccess);
  const items = useSelector((state) => state.cart.items);
  const billSummary = useSelector((state) => state.cart.billSum);

  
  useEffect(() => {
    setBill(billSummary);
  }, [billSummary]);

  
  useEffect(() => {
    dispatch(getProducts());
    dispatch(updateBillSummary());
    console.warn("bilsummar=====y", billSummary);
  }, [dispatch]);

  useEffect(() => {
    console.log("cartItems", items);
    setCartItems(items);
    dispatch(updateBillSummary());
  }, [isSuccess]);

  useEffect(() => {
    console.log("itemsUpdated:");
    if (!isEqual(billSummary, Bill)) {
      setBill(billSummary);
    }
  }, [Bill, billSummary]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1500); 

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  if (!isReady) {
    return <><Navbars navElements={navElements} showSearchbar={true}/> <div className="loading-container">Loading...</div></>
  }  

  async function paymenthandler(event) {
    console.log("totalBill", billSummary.totalBill);
    const amountInFloat = billSummary.totalBill * 100;
    const amount=Math.floor(amountInFloat);
    console.log("amount", amount);
    const currency = "INR";
    const receipt = "jsw#1";

    const response = await axios.post("http://localhost:3001/orders", {
      amount,
      currency,
      receipt,
    });

    const orderId = response.data.order_id;

    console.log("response.data.amount", response.data.amount);
    var options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: response.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: response.data.currency,
      name: "Kabeer Fashion",
      description: "Test Transaction",
      image:
        "https://img.freepik.com/free-vector/gradient-instagram-shop-logo-template_23-2149704603.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724803200&semt=ais_hybrid",
      order_id: response.data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        console.log("response==", response);
        const validateRes = await axios.post(
          `http://localhost:3001/validate_signature`,
          { response }
        );
        if (validateRes.status === 200) {
          setProductsInCart();
          navigate("/Orders");
        }
      },
      prefill: {
        name: "Kabeer Fashion",
        email: "gaurav.kumar@example.com",
        contact: "7355560660",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    console.log("option", options);
    console.log("orderId", orderId);

    var rzp1 = new window.Razorpay(options); //When you include the Razorpay script in your HTML file, it adds a Razorpay function to the window object, making it globally accessible.

    // Initialization: When you create the rzp1 instance using new Razorpay(options);, you're setting up everything needed for the payment, but the user interface isn't shown yet.
    // Opening the Payment Modal: By calling rzp1.open();, you trigger the Razorpay payment interface to appear on the screen. The user can then proceed to complete the payment.

    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
    event.preventDefault();
  }

  const headingMargin = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <div>
      <Navbars navElements={navElements} searchbar="true" />
      {!cartItems || cartItems.length === 0 ? (
        <div style={headingMargin}>
          <h1>No Items in Cart</h1>
        </div>
      ) : (
        <div className="cartPage">
          <div className="cartWrapper">
            <div className="container">
              <h2>Items In Your Cart</h2>
              <hr />
              {cartItems &&
                cartItems.map((product, key) => (
                  <ProductDetailsInCart
                    key={product.product_id}
                    name={product.productName}
                    product={product}
                    discountedPrice={product.discountedPrice}
                    quantity={product.quantity}
                    image={product.productImages[0].original}
                    // updateDisplay={() => dispatch(actionCreators.fetchCartItems(userContext.userDetails.email))}
                    _id={product.product_id}
                  />
                ))}
            </div>
          </div>
          <div className="priceDetail">
            <div>
              <h2 style={{ paddingLeft: "30%", backgroundColor: "white" }}>
                Price Details
              </h2>
            </div>
            <hr />
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>Price({Bill && Bill.numberOfItem} Items)</td>
                  <td>{Bill && Bill.totalPrice}</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td>{Bill && Bill.discount}</td>
                </tr>
                <tr>
                  <td>Delivery Charges</td>
                  <td>{Bill && Bill.delCharges}</td>
                </tr>
                <tr>
                  <td>
                    <h2>Total</h2>
                  </td>
                  <td>{Bill && Bill.totalBill}</td>
                </tr>
              </tbody>
            </table>
            <span>
              Note: You will receive a 20% discount (wholesale price) on any
              particular item if you purchase that item in bulk (minimum of 10
              items). The discount will be applied automatically.
              <br />
              Shipping charges are free on orders above Rs 1000
            </span>
            <hr />
            <div className="button-container">
              <button
                className="checkOutButton"
                onClick={(event) => paymenthandler(event)}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Cart);
