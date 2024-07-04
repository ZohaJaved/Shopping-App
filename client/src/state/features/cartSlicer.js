import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { useNavigate } from "react-router-dom";



export const getProducts=createAsyncThunk("cart/getData",
    async(arg,{rejectWithValue})=>{
        
        try{
            const response=await axios.get('http://localhost:3001/cart/getProductsInCart')
            
            return (await response).data;
        }catch(error){
         rejectWithValue(error.response.data);
        }
    }
);

//function  to modifyCart
export const modifyCart=createAsyncThunk(
  "cart/modifyCart",
  async(arg,{rejectWithValue})=>{ 
    
    try{
    if (!arg || !arg.productDetails) {
      console.warn("Invalid argument received:", arg); // Debugging statement for invalid args
      return rejectWithValue("Invalid argument: Product details are required");
     }
     // Make the API call
    const response = await axios.post('http://localhost:3001/cart/ModifyCart', {
    productDetails: arg.productDetails,
    quantityIncrement: arg.quantityIncrement,
    })
    console.log("response",response.data);
    return (await response).data;
    }
   catch(error){
   return rejectWithValue('Product details are missing');
   }
 })

 //function to calculate Bill
 function calculateBill(cartItems) {
  console.log("calculateBill")
  let billSum={
   numberOfItem:0,
   totalPrice:0,
   totalBill:0,
   delCharges:0,
   discount:0,
  }

  if (cartItems ) {
  console.log("cartItems",cartItems);
    cartItems.forEach(item => {
      console.log("item=",item)
    billSum.numberOfItem += item.quantity; // Increment number of items
    let itemTotal = item.productPrice * item.quantity; // Calculate total for the item
    // Apply discount if quantity is greater than or equal to 10
    if (item.quantity >= 10) {
      let discountAmount = itemTotal * 0.20; // 20% discount,replace with individual discount of each product
      billSum.discount += discountAmount;
    }
    billSum.totalBill+=itemTotal;
  });
  console.log("Bill Summary", billSum);
}
billSum.totalPrice=billSum.totalBill;
  // Calculate delivery charges
  if (billSum.totalBill < 1000) {
    billSum.delCharges = 100;
  }

  // Set the bill summary
  billSum.totalBill = (billSum.totalBill  - billSum.discount) + billSum.delCharges;
  
 
  console.log("Bill Summary", billSum);
  return billSum;
}

//function to add to cart
function AddToCart(productDetails,quantityIncrement){

     console.log("productDetails--> AddToCart",productDetails)
       axios.post(`http://localhost:3001/cart/AddToCart`, {
       productDetails: productDetails,
       quantityIncrement
      // email: userContext.userDetails.email
       })

        .then(response =>{  
             if(response&&response.error&&response.error.status===404)
            // navigate("/")
            
          console.log("addToCart completed with response",response.data)
          }
          )

            .catch(error=>{
            
            console.error("Error adding product:", error);
          })
   
  }

const initialState={
  items:[],
  isSuccess:false,
  message:null,
  loading:false,
  billSum:{},
  }
export const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
    updateBillSummary(state){
      state.billSum = calculateBill(state.items);
    },
    add_to_cart(state,action){
      console.log("state",state)
      console.log("action",action)
      state.items=AddToCart(action.payload.productDetails,action.payload.quantityIncrement);
    }
},
    extraReducers: (builder) => {
        builder
          .addCase(getProducts.pending, (state) => {
            console.warn("getProducts pending");
            state.loading = true;
           })
          .addCase(getProducts.fulfilled, (state, action) => {
            console.warn("getProducts fulfilled",action.payload);
            state.loading = false;
            state.items = action.payload;
            state.isSuccess = true;
          })
          .addCase(getProducts.rejected, (state, action) => {
            // Add error handling logic here 
            state.loading = false;
            state.message = action.error.message || 'Error fetching products'; // Set a default message
            state.isSuccess = false;
          })
           builder
           .addCase (modifyCart.pending,(state,action)=>{
           console.warn("arg==(2)")
           state.isSuccess=false;
           state.loading=true; 
          })
          .addCase(modifyCart.fulfilled,(state,action)=>{
           console.warn("arg==(3)")
           state.isSuccess=true;
           state.loading=false;
           state.items=action.payload;
           })
          .addCase(modifyCart.rejected,(state,action)=>{
            console.warn("arg==(4)")
            state.isSuccess=false;
            state.loading=false;
            state.message=action.error.message ||'error modifying cart';
          })

      },
      
})
export const {updateBillSummary,add_to_cart} =cartSlice.actions;
export default cartSlice.reducer;