import { useEffect, useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import styles from "./products.module.css";

import Navbar from "../Components/Navbar";
import AllenSolly from "../assets/men/Allen_Solly_Jacket.jpg";

import { AuthContext, CartContext } from "..";

const WishList = () => {
  const navigate = useNavigate();

  const { isloggedIn } = useContext(AuthContext);

  const { cart, deleteCartHandler, totalCartAmount, cartQuantityAPI } = useContext(CartContext);

  const quantityHandler = (productId, action, quantity) => {
    action === "decrement" && quantity === 1 ? deleteCartHandler(productId) : cartQuantityAPI(productId, action);
  };

  return (
    <>
      <Navbar />
      <h2>This is the cart</h2>
      {cart.length > 0 ? (
        <div className={styles.cartParent}>
          <div className={styles.cartContainer}>
            {cart.map((item) => (
              <div className={styles.cartCard}>
                <div>
                  <img src={AllenSolly} alt={item.name} />
                </div>
                <div>
                  <p>{item.brand}</p>
                  <p className={styles.name}>{item.name}</p>
                  <p className={styles.price}>₹ {item.price}</p>
                  <div className={styles.buttonContainer}>
                    <button className={styles.addCart} onClick={() => deleteCartHandler(item._id)}>
                      Remove from Cart
                    </button>
                  </div>
                  <div className={styles.quantityContainer}>
                    <button
                      onClick={(e) => {
                        quantityHandler(item._id, "increment", item.qty);
                      }}
                    >
                      +
                    </button>
                    <input type="text" value={item.qty} className={styles.quantity} disabled={true} />
                    <button onClick={(e) => quantityHandler(item._id, "decrement", item.qty)}>-</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cartBillingContainer}>
            <h3>Checkout Bill</h3>
            <div className={styles.cartBillList}>
              <div className={styles.billHeader}>
                <span>Item Name</span>
                <span>Amount</span>
              </div>

              {cart.map((item) => (
                <div className={styles.cartBillItem}>
                  <span className={styles.billItemName}>
                    {item.name} - {`(${item.qty})`}
                  </span>
                  <span className={styles.billItemPrice}>{item.price}</span>
                </div>
              ))}
              <div className={styles.total}>
                <span>Total : </span>
                <span>{totalCartAmount}</span>
              </div>
            </div>
            <button className={styles.checkout} onClick={() => navigate("/checkout")}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p>Please add items in the cart</p>
      )}
    </>
  );
};

export default WishList;
