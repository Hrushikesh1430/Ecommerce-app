import "./App.css";
import Mockman from "mockman-js";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Home } from "./pages/Home/Home";
import Products from "./pages/Products";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
// import { UserDetails } from "./pages/userDetails";
import { Userdetails } from "./pages/Userinfo";
import { Checkout } from "./pages/Checkout";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Context/AuthContext";
import { ProtectedRoutes } from "./Components/ProtectedRoutes";
import { DataContext } from ".";
import { Product } from "./pages/Product";

function App() {
  const navigate = useNavigate();
  const { checkLogin } = useContext(AuthContext);
  const { dispatch } = useContext(DataContext);

  const getProductsAPI = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      dispatch({ type: "INITIAL_FETCH", payLoad: data.products });
    } catch (e) {}
  };

  useEffect(() => {
    checkLogin();
    getProductsAPI();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mockman" element={<Mockman />} />

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
