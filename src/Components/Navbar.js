import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "..";
const Navbar = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser, setUserToken } = useContext(AuthContext);
  return (
    <>
      <nav>
        <ul>
          <li>
            <span className="brand">Meri Dukan</span>
          </li>
        </ul>

        <div className="loginNavWrapper">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/products">Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
          <button
            onClick={() => {
              localStorage.removeItem("userToken");
              localStorage.removeItem("loggedUser");
              setUserToken("");
              setUser({});
              setIsLoggedIn(false);
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
