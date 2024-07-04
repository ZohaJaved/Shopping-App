import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useAuth,AuthProvider } from './auth.js';
import Navbars from "./components/Navbars";
import Admin from "./components/AdminHome"
import SideNav from "./components/SideNav";
import Category from "./components/category"
import Product from "./components/Product/Product"
import User from './components/User/User.jsx';
import CategoryState from './components/Context/CategoryState.js';
import EditCategory from './components/EditCategory/EditCategory.jsx';
import SidebarState from './components/Context/SidebarState.js';
import ProductState from './components/Context/ProductState.js'
import EditProduct from './components/EditProduct/EditProduct.jsx'
import ProductUserDisplay from './components/ProdUserDisplay/ProductUserDisplay.jsx';
import Cart from "./components/Cart/Cart.jsx"
import OrderUser from './components/OrderUser/OrderUser.jsx';
import Ordermanage from "./components/OrderManage/OrderManage.jsx"
import SignUp from './components/RegistrationForm/RegistrationForm.jsx';
import "./App.css"
import LoginState from "./components/Context/LoginState.js"
import SearchItems from "./components/SearchItems/SearchItems.jsx"
import SearchState from './components/Context/SearchState.js';
import DeliveryBoy from './components/Employee/DeliveryBoy.jsx';
import { checkSession } from './components/api.js';
import LoginContext from './components/Context/LoginContext.js';
import { useContext } from 'react';

function AppContent(props){
    const {loggedIN,setLoggedIn}= useAuth();
    const {verifySession}=useAuth();
    function successfulLogin(){
        console.log("login successful============",loggedIN)
    }
    return(<div className="App" style={{width:'100vw',height:'100vh',overflow:'auto'}}>
    <BrowserRouter>
    <SearchState> 
    <ProductState> 
    <SidebarState>
    <CategoryState>
    <LoginState>
      <Routes>
        
        {loggedIN &&loggedIN===true?(
          <>
          {console.log("loggedIn=======++++++++++",loggedIN)}
       <Route path="/userHome"  element={<User/>} />
       <Route path="/admin"  element={<Admin/>} />
       <Route path="/ProductUserDisplay"  element={<ProductUserDisplay/>} />
       <Route path='/searchItems' element={<SearchItems/>}/>
       <Route path="/category"  element={<Category/>}/>
       <Route path="/edit-category" element={<EditCategory />} />
       <Route path="/editProduct" element={<EditProduct />} />
       <Route path="/product"  element={<Product/>}/>
       <Route path="/cart"  element={<Cart/>}/>
       <Route path="/orderUser"  element={<OrderUser/>}/>
       <Route path="/orderManage"  element={<Ordermanage/>}/>
       <Route path="/" element={<SignUp verifySession={()=>verifySession} setLoggedIn={setLoggedIn} successfulLogin={()=>successfulLogin()} />}/>
       <Route path="/delBoy" element={<DeliveryBoy/>} />
       </>
       )
       :(<Route path="*"  element={<SignUp verifySession={()=>verifySession} setLoggedIn={setLoggedIn} successfulLogin={()=>successfulLogin()}/>}/>)
        }
      </Routes>
      
      </LoginState>
    </CategoryState>
    </SidebarState>
    </ProductState>
    </SearchState>
    </BrowserRouter>
  </div>)
}
export default AppContent;