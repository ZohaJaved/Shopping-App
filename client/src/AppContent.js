import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./auth.js";
import Admin from "./components/AdminHome";
import Category from "./components/Category_admin/category.jsx";
import Product from "./components/productAdmin/Product";
import ProductInput from "./components/productAdmin/productInput.jsx";
import User from "./components/User/User.jsx";
import CategoryState from "./Context/CategoryState.js";
import EditCategory from "./components/EditCategory/EditCategory.jsx";
import SidebarState from "./Context/SidebarState.js";
import ProductState from "./Context/ProductState.js";
import EditProduct from "./components/EditProduct/EditProduct.jsx";
import ProductUserDisplay from "./components/ProdUserDisplay/ProductUserDisplay.jsx";
import Cart from "./components/Cart/Cart.jsx";
import OrderUser from "./components/OrderUser/OrderUser.jsx";
import Ordermanage from "./components/OrderManage/OrderManage.jsx";
import SignUp from "./components/RegistrationForm/RegistrationForm.jsx";
import "./App.css";
import LoginState from "./Context/LoginState.js";
import SearchItems from "./components/SearchItems/SearchItems.jsx";
import SearchState from "./Context/SearchState.js";
import DeliveryBoy from "./components/Employee/DeliveryBoy.jsx";
import ProductDetailsPage from "./components/ProductDetailsPage/ProductDetailsPage.jsx";
import AccountDetails from "./components/AccountDetails/AccountDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute.js";

function AppContent(props) {
  const { loggedIN, setLoggedIn } = useAuth();
  const { verifySession } = useAuth();

  function successfulLogin() {
    console.log("login successful============", loggedIN);
  }

  return (
    <div
      className="App"
      style={{ width: "100vw", height: "100vh", overflow: "auto" }}
    >
      <BrowserRouter>
        <SearchState>
          <ProductState>
            <SidebarState>
              <CategoryState>
                <LoginState>
                  <Routes>
                    {/* {loggedIN && loggedIN === true ? ( */}
                      <>
                        {console.log("loggedIn=======++++++++++", loggedIN)}
                        <Route
                          path="/"
                          element={
                            <SignUp
                              verifySession={() => verifySession}
                              setLoggedIn={setLoggedIn}
                              successfulLogin={() => successfulLogin()}
                            />
                          }
                        />
                        {/* <Route path="/Home"  element={<User/>} />   */}
                        <Route
                          element={<ProtectedRoute roles={["customer"]} />}
                        >
                          <Route path="/Home" element={<User />} />
                          <Route path="/ProductUserDisplay" element={<ProductUserDisplay />}
                        />
                        <Route path="/searchItems" element={<SearchItems />} />
                        <Route path="/Cart" element={<Cart />} />
                        <Route path="/Account" element={<AccountDetails />} />
                        <Route path="/Orders" element={<OrderUser />} />
                        <Route
                          path="/productDetailsPage"
                          element={<ProductDetailsPage />}
                        />
                        </Route>
                        {/* <Route path="/admin" element={<Admin />} /> */}
                        <Route
                          element={<ProtectedRoute roles={["admin"]} />}
                        >
                          <Route path="/admin" element={<Admin />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/edit-category" element={<EditCategory />} />
                        <Route path="/editProduct" element={<EditProduct />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/orderManage" element={<Ordermanage />} />
                        <Route
                          path="/productInput"
                          element={<ProductInput />}
                        />
                        </Route>
                        <Route path="/delBoy" element={<DeliveryBoy />} />
                      </>
                  </Routes>
                </LoginState>
              </CategoryState>
            </SidebarState>
          </ProductState>
        </SearchState>
      </BrowserRouter>
    </div>
  );
}
export default AppContent;
