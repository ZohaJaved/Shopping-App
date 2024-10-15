import Order from "../Model/OrderModel.js"
import mongoose from "mongoose";
import Cart from "../Model/CartModel.js"
import UserModel from "../Model/userModel.js";

export const confirmOrder=async(req,res) =>{
    const item=req.body;
    console.log("item",item)
    const newOrderData={
      customerName:req.session.user.name,
      user_id:req.session.user.email,///check it letter
      product_id:item.product_id,
      productName:item.productName,
      discountedPrice:item.discountedPrice,
      amount:item.quantity*item.discountedPrice,
      paymentMode:'cod',
      address:req.session.user.address,
      quantity:item.quantity,
      image:item.image,
      message:'pending',
      email:req.session.user.email,
      contactNum:'9876543210'
    }
    const currentDate = new Date();
    newOrderData.date=currentDate.toLocaleDateString();
   
 // console.log("newProductData",newOrderData);
  const newOrder=new Order(newOrderData);
  try {
    const email=req.session.user.email;
    await newOrder.save();
    const user = await UserModel.findOne({email});
    if (!user) {
        navigate('/');
    } else {
         console.log("cart",user.cart)
        console.log("sss",email)
        
        user.cart.remove({})// Use await to ensure the cart items are deleted before continuing
        await user.save();
    }

  // await Cart.deleteMany({});
    res.status(200).json(newOrderData)
  }
  catch(error){
    res.status(500).json({ message: 'Internal server error' });
    console.log("error",error)
  }
  }

  export const getOrderDetails = async (req, res) => {
    
    try {
        const orders = await Order.find();
        
      
       if (!orders || orders.length === 0) {
        return res.json({ message: 'No orders found' });
      }
    //  console.log("getOrderDetails",orders);
   // console.log("orderDetails",orders)
      return res.status(200).json({orders})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //user's order from database
  export const getUserOrderDetails=async (req, res) => {
    const email = req.query.email; // Extract email from query parameters
    console.log("email",email)
    try{
       //find the userDetails
     const usersOrder=await Order.find({email})
      // console.log("userDetails",usersOrder);
      if(!usersOrder){
       return res.status(404).json({ message: 'orders not found' });
      }
      res.json({usersOrder})
    }
    catch(error){
      console.log(error);
    }
  }

  export const updateOrder = async (req, res) => {
    console.log("/api/updateOrder");
    const { message, status, delivery } = req.body;
    try{
      const updatedValue=await Order.findByIdAndUpdate(req.params.id,{message,status,delivery},{new:true})
      console.log("update value from server",updatedValue)
      return res.status(200).json({ message: 'updated successfully from the server side' });
    }
    catch(error){
      console.error(error);
    }
  }