import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./products.module.css";

import Navbar from "../Components/Navbar";
import AllenSolly from "../assets/men/Allen_Solly_Jacket.jpg";

import { AuthContext, CartContext, WishListContext } from "..";
import { addItemToCartHandler } from "../backend/controllers/CartController";
import { CustomModal } from "../Components/CustomModal";

const Products = () => {
  const navigate = useNavigate();

  // usertoken = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JmZmU0Yy1mYjUwLTQ2NjEtOTZmOC01YWEwOTNjNDE0YTEiLCJlbWFpbCI6ImhkdGF3ZGVAZ21haWwuY29tIn0.lHuCh3AbbV5_HUP771IKdyUognhckf4dleARPrd4RA4

  const [products, setProducts] = useState([]);

  const { userToken } = useContext(AuthContext);

  const { wishList, addToWishList } = useContext(WishListContext);

  const { cart, addCartHandler } = useContext(CartContext);

  const getProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.products);
    } catch (e) {}
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Navbar />
      <h1 className={styles.productTitle}>Products</h1>
      <div className={styles.productParent}>
        <div className={styles.filters}>
          <div className={styles.filterHeader}>
            <h2>Filters</h2>
            <p>Clear</p>
          </div>
          <div className={styles.categories}>
            <h4>Categories</h4>
            <div>
              <input type="checkbox" value="men" />
              <label>Men</label>
            </div>
            <div>
              <input type="checkbox" value="women" />
              <label>Women</label>
            </div>
            <div>
              <input type="checkbox" value="kids" />
              <label>Kids</label>
            </div>
          </div>
          <div className={styles.sizes}>
            <h4>Sizes</h4>
            <div>
              <input type="checkbox" value="S" />
              <label>S</label>
            </div>
            <div>
              <input type="checkbox" value="M" />
              <label>M</label>
            </div>
            <div>
              <input type="checkbox" value="L" />
              <label>L</label>
            </div>
            <div>
              <input type="checkbox" value="XL" />
              <label>XL</label>
            </div>
            <div>
              <input type="checkbox" value="XxL" />
              <label>XXL</label>
            </div>
          </div>
          <div className={styles.rating}>
            <h4>Rating</h4>
            <div>
              <input type="radio" value="4" name="rating" />
              <label>4 stars and above</label>
            </div>
            <div>
              <input type="radio" value="3" name="rating" />
              <label>3 stars and above</label>
            </div>
            <div>
              <input type="radio" value="2" name="rating" />
              <label>2 stars and above</label>
            </div>
            <div>
              <input type="radio" value="1" name="rating" />
              <label>1 stars and above</label>
            </div>
          </div>
        </div>
        <div className={styles.productContainer}>
          {products.map((item) => (
            <div className={styles.productCard}>
              <img src={AllenSolly} alt={item.name} />
              <p>{item.brand}</p>
              <p className={styles.name}>{item.name}</p>
              <div className={styles.buttonContainer}>
                {cart.find((cartItem) => cartItem._id === item._id) ? (
                  <button
                    className={styles.addWishList}
                    onClick={() => navigate("/cart")}
                  >
                    Go to Cart
                  </button>
                ) : (
                  <button
                    className={styles.addWishList}
                    onClick={() => addCartHandler(item)}
                  >
                    Add to Cart
                  </button>
                )}
                {wishList.find(
                  (wishListItem) => wishListItem._id === item._id
                ) ? (
                  <button
                    className={styles.addWishList}
                    onClick={() => navigate("/wishlist")}
                  >
                    Go to WishList
                  </button>
                ) : (
                  <button
                    className={styles.addWishList}
                    onClick={() => addToWishList(item)}
                  >
                    Add to WishList
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Products;
