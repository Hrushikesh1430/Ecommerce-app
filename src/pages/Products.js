import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./products.module.css";

import Navbar from "../Components/Navbar";
import AllenSolly from "../assets/men/Allen_Solly_Jacket.jpg";

import { AuthContext, CartContext, WishListContext } from "..";
import { addItemToCartHandler } from "../backend/controllers/CartController";

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

  console.log("in products");

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.productParent}>
        <h1 className={styles.productTitle}>Products</h1>
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
