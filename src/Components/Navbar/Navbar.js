import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import { AuthContext } from "../..";
import { SearchBar } from "../SearchBar/SearchBar";
import PcLogo from "../../assets/Navbar/logo.png";

import styles from "./Navbar.module.css";
const Navbar = () => {
  const navigate = useNavigate();
  const { isloggedIn, setUserToken, setUser, setIsLoggedIn } = useContext(AuthContext);
  return (
    <header>
      <nav className={styles.navBarWrapper}>
        <div className={styles.brand}>
          <img src={PcLogo} alt="logo" />
        </div>
        <SearchBar />
        <div className={styles.navItems}>
          {/* <Link to="/">Home</Link> */}
          {/* <Link to="/products">Products</Link> */}
          {/* <li>
              <Link to="/signup">Signup</Link>
            </li> */}
          <ul>
            <li>
              {isloggedIn ? (
                <Link to="/userdetails">
                  <AccountCircleOutlinedIcon className={styles.user} />
                </Link>
              ) : (
                <Link to="/login" className={styles.signIn}>
                  Sign In
                </Link>
              )}
            </li>
            <li>
              <Link to="/wishlist">
                <FavoriteBorderOutlinedIcon className={styles.heart} />
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <ShoppingCartOutlinedIcon className={styles.cart} />
              </Link>
            </li>
            {isloggedIn && (
              <li>
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
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
