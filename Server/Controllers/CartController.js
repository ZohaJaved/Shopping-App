import mongoose from "mongoose";
import Cart from "../Model/CartModel.js";
import UserModel from "../Model/userModel.js";
import bodyParser from "body-parser";
import session from "express-session";



export const AddToCart = async (req, res) => {
  
  const { ObjectId } = mongoose.Types; // Destructure ObjectId

    const { productName, productPrice, category, discount, image, _id
       } = req.body.productDetails;
       const email=req.session.user.email;
       console.log("email",email)
    const quantityIncrement = req.body.quantityIncrement;
    console.log("_id",_id)
   // console.log("req.body",req.body)
    const newCartItem = {
        productName,
        productPrice,
        category,
        discount,
        quantity:1,
        image,
        product_id: _id, // Assuming this is the correct ID field
        
    };
    
    try {
     //find the userDetails
     const user=await UserModel.findOne({email})
    //  console.log("userDetails",user);
     if(!user){
      return res.status(404).json({ message: 'User not found' });
     }
      
     // Check if the product already exists in the user's cart
     console.log("_id",_id)

    const existingCartItem = user?.cart?.find(item =>{const mongooseObjectId = new ObjectId(_id);
      return mongooseObjectId.equals(item.product_id);})
    // existingCartItem will be either the matching item or null
    
     console.log("existingCartItem",existingCartItem);
     if (existingCartItem) {
      // If the product exists, update the quantity
      existingCartItem.quantity += quantityIncrement;
  }
  else {
    // If the product doesn't exist, create a new item and add it to the cart
    user.cart&&user.cart.push({
        product_id: _id,
        productName,
        productPrice,
        category,
        discount,
        image,
        quantity: quantityIncrement
    });
}
// Save the updated user object
const updatedUser = await user.save();

// Return the updated user object with the cart
return res.status(200).json(updatedUser.cart);
} catch (error) {
console.error('An error occurred:', error);
return res.status(500).json({ message: 'Internal server error' });
}
};
   


    //   const updatedCart = await Cart.findOneAndUpdate(
    //       { product_id: _id },
    //       { $inc: { quantity: quantityIncrement } },
    //       { new: true } // Return the updated or created document
    //   );
    
    //   if (updatedCart) {
    //     // console.log('Quantity updated successfully.',updatedCart);
    //     return res.status(200).json(updatedCart);
    //   } else {
    //     console.log('Item not found in cart, creating new item.');
    //     const newItem = new Cart(newCartItem);
    //     const savedItem = await newItem.save();
    //     return res.status(201).json(savedItem);
    //   }
    // } catch (error) {
    //   console.error('An error occurred:', error);
    //   return res.status(500).json({ message: 'Internal server error' });
    // }
    
//modify Cart
export const ModifyCart = async (req, res) => {
   console.log("ModifyCart in userController ");
  const { ObjectId } = mongoose.Types; // Destructure ObjectId
    const productDetails = req.body.productDetails;
    const quantityIncrement = req.body.quantityIncrement;
    const productID=productDetails.product_id;
    const email = req.session.user.email;
    // console.log("quantityIncrement",quantityIncrement);
    // console.log("productDetails",productDetails);
    // console.log("product_id",productID);

    try {
      // Find the user by email
      const user = await UserModel.findOne({ email });
  
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the existing cart item with the given product ID
      const existingCartItem = user.cart.find(item => {
          const mongooseObjectId = new ObjectId(productID);
          return mongooseObjectId.equals(item.product_id);
      });
  
      // console.log("existingCartItem", existingCartItem);
  
      // If quantityIncrement is 0, delete the item from the cart
      if (quantityIncrement === 0) {
          const updatedUser = await UserModel.findOneAndUpdate(
              { 'email': email },
              { $pull: { 'cart': { 'product_id': productID } } },
              { new: true }
          );
  
          if (updatedUser) {
            
              return res.status(200).json(updatedUser.cart);
          } else {
              return res.status(404).json({ message: 'Item not found in cart' });
          }
      }
      console.log("quantityIncrement",quantityIncrement)
      const updatedUser = await UserModel.findOneAndUpdate(
        { 'email': email, 'cart.product_id': productID },
        { $inc: { 'cart.$.quantity': quantityIncrement } },
        { new: true }
      );
       console.warn("quantity after modify",updatedUser.cart)
        return res.status(200).json(updatedUser.cart);

      
  } catch (error) {
      console.error('Error:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
  }
  
}
  // if (quantityIncrement === 0) {
  //   try {
  //     //here using a product_id instead of _id because it is from cart, if we use _id ,_id is of 
  //     const deletedCart = await Cart.findOneAndDelete({ product_id:product_id });
  //     if (deletedCart) {
  //       return res.status(200).json(deletedCart); // Send response if item is successfully deleted
  //     } else {
  //       return res.status(404).json({ message: 'Item not found in cart.' }); // Send appropriate response if item not found
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json({ message: 'Internal server error.' }); // Send appropriate response if an error occurs
  //   }
  // }
  
  // try {
  //   const updatedCart = await Cart.findOneAndUpdate(
  //       { product_id: product_id },
  //       { $inc: { quantity: quantityIncrement } },
  //   );
  
  //   if (updatedCart) {
  //     console.log('Quantity updated successfully.',updatedCart.quantity);
  //     return res.status(200).json(updatedCart);
  //   } else {
  //     console.log('Item not found in cart, creating new item.');
  //   }
  // } catch (error) {
  //   console.error('An error occurred:', error);
  //   return res.status(500).json({ message: 'Internal server error' });
  // }
  
  

  
  //products available in cart 
//   export const getProductsInCart = async (req, res) => {
//     console.log('On profile request - req.session:', req.session); // Log the entire session object
//     console.log('On profile request - req.session.user:', req.session.user); // Log the user



//     const sessionId = req.query.sessionId; // Extract session ID from query parameters
//     console.log("req.query.sessionId", req.query.sessionId);
//     const user=req.session.user;
//     // if(user){
//     //     console.log("User profile:ID=${user.id},Name=${user.name}",user.id,user.name)
//     //     res.send('User profile:ID=${user.id},Name=${user.name}');
//     // }
//     // else{
//     //     res.send('No user logged in')
//     // }
    
//     // Find the userDetails from session
//     req.sessionStore.get(sessionId, (error, sessionData) => {
//         if (error) {
//             console.error("Error retrieving session data:", error);
//             return res.status(500).json({ message: 'Error retrieving session data' });
//         }

//         if (!sessionData) {
//             return res.status(404).json({ message: 'Session data not found' });
//         }
        
//         console.log("sessionData", sessionData);
//         res.json({ products: sessionData.cart });
//     });
// };


 // products available in cart 
 export const getProductsInCart = async (req, res) => {
  console.log("getProductsInCart in userController====", req.session.user.name);

  // const sessionId = req.query.sessionId;
    const userDetails = req.session.user;
    if (userDetails) {//for authentication
      console.log("userDetails.email",userDetails.email)
        try{
          let cart=await UserModel.find({email:userDetails.email})
            
          console.log("cartItems",cart);
          res.json(userDetails.cart);
        }
        catch(error){
          console.log(error);
        }
    } else {
        res.status(404).json({ message: 'User details not found for the given session ID' });
    }
};
