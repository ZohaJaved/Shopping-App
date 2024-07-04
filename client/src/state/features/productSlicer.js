import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { defer } from "react-router-dom";

export const fetchItemsToDisplay=createAsyncThunk("displayPage/getData",
    async(arg,{rejectWithValue})=>{
      try{
        const response= await axios.get("http://localhost:3001/product/itemsToDisplay",{
        params:{
          arg
        }
       })
       console.log("response==",response.data);
       return (await response).data;
      }
      catch(error){
       return rejectWithValue('SearchType is missing')
      }
    })
  
    let initialState={
      fetchedItems:[],
      loading:false,
      isSuccess:false,
      message:null,
      searchItemsBy:null
     }
    export const productSlice=createSlice({
        name:'product',
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
         builder
         .addCase(fetchItemsToDisplay.pending,(state,action)=>{
          console.log("fetchItemsToDisplay.pending")
           state.loading=true
         })
         .addCase(fetchItemsToDisplay.fulfilled,(state,action)=>{
           console.log("action.payload",action.payload)
           state.loading = false;
           state.isSuccess=true;
           state.fetchedItems=action.payload
         })
         .addCase(fetchItemsToDisplay.rejected,(state,action)=>{
           state.loading=false;
           state.isSuccess=false;
           state.message=action.error.message;
         })
        }
       })    
    export default productSlice.reducer;  