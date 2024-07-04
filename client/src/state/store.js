import {combineReducers, configureStore} from '@reduxjs/toolkit';
import cartReducer from './features/cartSlicer';
import  productReducer  from './features/productSlicer';

const rootReducer=combineReducers({
    cart:cartReducer,
    product:productReducer
})

const store=configureStore({
    reducer:rootReducer,
})
export default store;