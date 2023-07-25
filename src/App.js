import "./App.css";
import Mockman from "mockman-js";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import WishList from "./pages/WishList/WishList";
import Cart from "./pages/Cart/Cart";
// import { UserDetails } from "./pages/userDetails";
import { Userdetails } from "./pages/UserInfo/Userinfo";
import { Checkout } from "./pages/Checkout/Checkout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Context/AuthContext";
import { ProtectedRoutes } from "./Components/ProtectedRoutes";
import { DataContext } from ".";
import { Product } from "./pages/Product/Product";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import Loader from "./Components/Loader/Loader";
import { HideLoader } from "./Common/Utility";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();
  const { checkLogin } = useContext(AuthContext);
  const { dispatch, setAppDevice } = useContext(DataContext);

  const getProductsAPI = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      dispatch({ type: "INITIAL_FETCH", payLoad: data.products });
    } catch (e) {
    } finally {
      HideLoader();
    }
  };

  useEffect(() => {
    checkLogin();
    getProductsAPI();

    function handleResize() {
      if (window.innerWidth >= 1024) {
        setAppDevice(1);
      } else {
        setAppDevice(0);
      }
    }
    handleResize();

    window.addEventListener("resize", handleResize);
  }, []);

  // if (loading) {
  //   return null;
  // }

  return (
    <div className="App">
      <ScrollToTop />
      <ToastContainer toastStyle={{ backgroundColor: "#fb5d5d;" }} />
      {/* <Loader /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/mockman" element={<Mockman />} /> */}

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<Product />} />

        <Route path="/wishlist" element={<ProtectedRoutes component={<WishList />} redirect={"login"} />} />
        <Route path="/cart" element={<ProtectedRoutes component={<Cart />} redirect={"login"} />} />
        <Route path="/userdetails" element={<ProtectedRoutes component={<Userdetails />} redirect={"login"} />} />
        <Route path="/checkout" element={<ProtectedRoutes component={<Checkout />} redirect={"login"} />} />

        <Route path="*" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
