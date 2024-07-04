import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import isEqual from 'lodash.isequal';
import axios from 'axios';
// import actionCreators from '../../state/index.js';
import LoginContext from '../Context/LoginContext';
import ProductDetailsInCart from '../ProductDetailsInCart/ProductDetailsInCart';
import {calculateBill, getProducts, updateBillSummary} from "../../state/features/cartSlicer.js"
import './Cart.css';
import { isFulfilled } from '@reduxjs/toolkit';

const Cart = () => {
  const dispatch = useDispatch();
  const isSuccess = useSelector((state) => state.cart.isSuccess);
  const items = useSelector((state) => state.cart.items);
  const billSummary=useSelector((state)=>state.cart.billSum)
  const [cartItems, setCartItems] = useState([]);
  const userContext = useContext(LoginContext);
  const navigate = useNavigate();
  const navElements = ["Home", "Orders", "Account", "Logout"];
  const [productsInCart, setProductsInCart] = useState(null);
  const [Bill, setBill] = useState(billSummary);
  const [isChecked, setIsChecked] = useState(false);
  const [displayCart, setDisplayCart] = useState(productsInCart);
  const [noItemInCart, setNoItemInCart] = useState(productsInCart);
  
  useEffect(()=>{
    dispatch(getProducts());
    dispatch(updateBillSummary());
    // setBill(billSummary)
    console.warn("bilsummar=====y",billSummary)
  },[dispatch]);
 
 useEffect(()=>{
    console.log("cartItems",items)
    setCartItems(items);
    dispatch(updateBillSummary());
 },[isSuccess])
 useEffect(()=>{
  console.log("itemsUpdated:")
  if(!isEqual(billSummary,Bill)){
   // dispatch(updateBillSummary());
   setBill(billSummary)
  }
 },[Bill,billSummary])

 

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const confirmOrder = async () => {
    if (cartItems && userContext) {
      try {
        for (const item of cartItems) {
         
          await axios.post('http://localhost:3001/order/confirmOrder', item);
        }
        setProductsInCart();
        navigate('/orderUser');
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div>
      {!cartItems || cartItems.length === 0 ? (
        <div>
          <h1>No Items in Cart</h1>
        </div>
      ) : (
        <div className='cartPage'>
          <div className='cartWrapper'>
            <div className="container">
              <h2 style={{ marginBottom: '3rem' }}>Items In Your Cart</h2>
              <hr />
              {cartItems &&cartItems.map((product, key) => (
                <ProductDetailsInCart
                  key={product.product_id}
                  name={product.productName}
                  image={product.image}
                  price={product.productPrice}
                  quantity={product.quantity}
                  product={product}
                  // updateDisplay={() => dispatch(actionCreators.fetchCartItems(userContext.userDetails.email))}
                  _id={product.product_id}
                />
              ))}
            </div>
          </div>
          <div className="priceDetail">
            <div>
              <h2>Price Details</h2>
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
                <tr>
                  <td colSpan="2">
                    <label>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        style={{ pointerEvents: 'all' }}
                        required
                      />
                      Cash on Delivery
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
            <span>
              Note: You will receive a 20% discount (wholesale price) on any particular item if you purchase that item in bulk (minimum of 10 items). The discount will be applied automatically.
              <br />
              Shipping charges are free on orders above Rs 1000
            </span>
            <hr />
            <button className='checkOutButton' onClick={confirmOrder}>Confirm Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Cart);
