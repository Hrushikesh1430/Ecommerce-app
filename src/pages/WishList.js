import { useEffect, useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import styles from "./Products/products.module.css";

import Navbar from "../Components/Navbar/Navbar";
import AllenSolly from "../assets/men/Allen_Solly_Jacket.jpg";

import { AuthContext, CartContext, WishListContext } from "..";

const WishList = () => {
  const navigate = useNavigate();

  const { wishList, addToWishList, deleteWishList, getWishListAPI } = useContext(WishListContext);

  return (
    <>
      <Navbar />
      <h2>This is the wishlist</h2>

      <div className={styles.productContainer}>
        {wishList.length > 0 ? (
          wishList.map((item) => (
            <div className={styles.productCard}>
              <img src={AllenSolly} alt={item.name} />
              <p>{item.brand}</p>
              <p className={styles.name}>{item.name}</p>
              <div className={styles.buttonContainer}>
                <button className={styles.addCart}>Add to Cart</button>
                {wishList.find((wishListItem) => wishListItem._id === item._id) ? (
                  <button className={styles.addWishList} onClick={() => deleteWishList(item._id)}>
                    Remove from WishList
                  </button>
                ) : (
                  <button className={styles.addWishList} onClick={() => addToWishList(item)}>
                    Add to WishList
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Please add items in the wishlist</p>
        )}
      </div>
    </>
  );
};

export default WishList;
