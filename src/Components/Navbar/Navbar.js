import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import { AuthContext, CartContext, DataContext, WishListContext } from "../..";
import { SearchBar } from "../SearchBar/SearchBar";
import PcLogo from "../../assets/Navbar/logo.png";

import { toast } from "react-toastify";

import styles from "./Navbar.module.css";
const Navbar = () => {
  const navigate = useNavigate();
  const { AppDevice } = useContext(DataContext);
  const { wishList, setWishList } = useContext(WishListContext);
  const { cart, setCart } = useContext(CartContext);
  const { isloggedIn, setUserToken, setUser, setIsLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  return (
    <header>
      <nav className={styles.navBarWrapper}>
        <div className={styles.brand}>
          <img src={PcLogo} alt="logo" onClick={() => navigate("/")} />
        </div>
        {AppDevice === 1 && <SearchBar />}
        <div className={styles.navItems}>
          {/* <Link to="/">Home</Link> */}
          {/* <Link to="/products">Products</Link> */}
          {/* <li>
              <Link to="/signup">Signup</Link>
            </li> */}
          <ul>
            {AppDevice === 1 && (
              <li>
                <Link to="/products" className={styles.signIn}>
                  Explore
                </Link>
              </li>
            )}

            <li>
              {isloggedIn ? (
                <Link to="/userdetails">
                  <AccountCircleOutlinedIcon className={styles.user} sx={{ stroke: "transparent", strokeWidth: 1 }} />
                </Link>
              ) : (
                <Link to="/login" className={styles.signIn} state={{ from: location }}>
                  Sign In
                </Link>
              )}
            </li>
            <li>
              <Link to="/wishlist">
                <div className={styles.iconWrapper}>
                  <FavoriteIcon className={styles.heart} sx={{ stroke: "transparent", strokeWidth: 1 }} />
                  {wishList.length > 0 && <div className={styles.quantity}>{wishList.length}</div>}
                </div>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <div className={styles.iconWrapper}>
                  <ShoppingCartOutlinedIcon className={styles.cart} sx={{ stroke: "transparent", strokeWidth: 1 }} />
                  {cart.length > 0 && <div className={styles.quantity}>{cart.length}</div>}
                </div>
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
                    setWishList([]);
                    setCart([]);
                    toast.success(`Logged out successfully`, {
                      position: "bottom-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      theme: "light",
                    });
                    navigate("/login", { state: { from: location } });
                  }}
                  className={styles.logout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {AppDevice === 0 && <SearchBar />}
    </header>
  );
};

export default Navbar;
