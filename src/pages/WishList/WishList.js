import { useEffect, useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import styles from "./wishList.module.css";

import Navbar from "../../Components/Navbar/Navbar";

import EmptyWishList from "../../assets/Wishlist/empty.png";

import { AuthContext, CartContext, WishListContext } from "../..";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import Footer from "../Home/Footer/Footer";

const WishList = () => {
  const navigate = useNavigate();

  const { addCartHandler, cart, cartButtonDisabled, cartButtonId } = useContext(CartContext);

  const { wishList, addToWishList, deleteWishList, getWishListAPI, wishButtonDisabled, wishButtonId } = useContext(WishListContext);

  return (
    <>
      <Navbar />
      <section className={styles.WishListContainer}>
        {wishList.length > 0 && <span className={styles.title}>My WishList ({wishList.length})</span>}

        {wishList.length > 0 ? (
          <div className={styles.productContainer}>
            {wishList.map((item, index) => (
              <div className={styles.productCard} onClick={() => navigate(`/product/${item._id}`)}>
                <div className={styles.close}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteWishList(item._id);
                    }}
                    disabled={wishButtonId === item._id ? wishButtonDisabled : false}
                  >
                    <CloseOutlinedIcon sx={{ stroke: "transparent", strokeWidth: 1 }} className={styles.closeIcon} />
                  </button>
                </div>
                <div className={styles.productImage}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={styles.productInfo}>
                  <span className={styles.brand}>{item.brand}</span>

                  <span className={styles.name}>{item.name}</span>
                  <div className={styles.priceContainer}>
                    <span className={styles.productPrice}>₹ {item.price}</span>
                    <span className={styles.discount}>₹ 8000</span>
                  </div>
                  <div className={styles.buttonContainer}>
                    {cart.find((cartItem) => cartItem._id === item._id) ? (
                      <button
                        className={styles.addCart}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/cart");
                        }}
                      >
                        Go to Cart
                      </button>
                    ) : (
                      <button
                        className={styles.addCart}
                        onClick={(e) => {
                          e.stopPropagation();
                          addCartHandler(item);
                        }}
                        key={item._id}
                        disabled={cartButtonId === item._id ? cartButtonDisabled : false}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.wishListEmpty}>
            <img src={EmptyWishList} alt="empty" className={styles.empty} loading="lazy" />
            <div className={styles.wishListInfo}>
              <span className={styles.lonelyText}>Your wishlist is lonely and looking for love.</span>
              <span className={styles.addText}>Add products to your wishlist, review them anytime and easily move to cart.</span>
            </div>
            <button onClick={() => navigate("/products")}>Continue Shopping</button>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default WishList;
