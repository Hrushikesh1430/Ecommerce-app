import { useEffect, useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import styles from "./cart.module.css";

import Navbar from "../../Components/Navbar/Navbar";

import { CartContext, DataContext, WishListContext } from "../..";
import Footer from "../Home/Footer/Footer";

const WishList = () => {
  const navigate = useNavigate();

  const { cart, deleteCartHandler, totalCartAmount, cartQuantityAPI, cartButtonDisabled, cartButtonId, quantityDisabled, quantityId } =
    useContext(CartContext);
  const { wishList, addToWishList, wishButtonDisabled, wishButtonId } = useContext(WishListContext);

  const { discount, deliveryCharges } = useContext(DataContext);

  const quantityHandler = (productId, action, quantity) => {
    action === "decrement" && quantity === 1 ? deleteCartHandler(productId) : cartQuantityAPI(productId, action);
  };

  const checkoutTotal = totalCartAmount + (totalCartAmount < 1500 && deliveryCharges) - (totalCartAmount > 2000 && discount);

  return (
    <>
      <Navbar />
      <section className={styles.cartParent}>
        {cart.length > 0 ? (
          <>
            <div className={styles.cartContainer}>
              {cart.map((item) => (
                <div className={styles.cartCard}>
                  <div className={styles.cartImage}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className={styles.cardInfo}>
                    <div className={styles.cardInfoWrapper}>
                      <div>
                        <span className={styles.name}>{item.name}</span>
                        <span className={styles.brand}>{item.brand}</span>
                      </div>
                      <div>
                        <span className={styles.price}>₹ {item.price}</span>
                      </div>
                    </div>

                    <div className={styles.quantityContainer}>
                      <button
                        onClick={(e) => {
                          quantityHandler(item._id, "increment", item.qty);
                        }}
                        className={styles.quantity}
                        disabled={quantityId === item._id ? quantityDisabled : false}
                      >
                        +
                      </button>
                      <input type="text" value={item.qty} disabled={true} className={styles.quantityInput} />
                      <button
                        onClick={(e) => quantityHandler(item._id, "decrement", item.qty)}
                        className={`${styles.quantity} ${item.qty < 2 && styles.disable} ${styles.decrease}`}
                        disabled={quantityId === item._id ? quantityDisabled : item.qty < 2 ? true : false}
                      >
                        -
                      </button>
                    </div>
                    <div className={styles.bottom}>
                      {wishList.find((wishListItem) => wishListItem._id === item._id) ? (
                        <button className={styles.remove} onClick={() => navigate("/wishlist")}>
                          Go to WishList
                        </button>
                      ) : (
                        <button
                          className={styles.remove}
                          onClick={() => addToWishList(item)}
                          disabled={wishButtonId === item._id ? wishButtonDisabled : false}
                        >
                          Add to WishList
                        </button>
                      )}
                      <button
                        className={styles.remove}
                        onClick={() => deleteCartHandler(item._id)}
                        disabled={cartButtonId === item._id ? cartButtonDisabled : false}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.cartBillingContainer}>
              <span className={styles.billTitle}>Billing Details</span>
              <div className={styles.cartBillList}>
                {cart.map((item) => (
                  <div className={styles.cartBillItem}>
                    <span className={styles.billItemName}>{`${item.name} (${item.qty})`}</span>

                    <span className={styles.billItemPrice}>{item.price}</span>
                  </div>
                ))}
                <div className={styles.cartBillItem}>
                  <span>Cart Total</span>
                  <span>₹ {totalCartAmount}</span>
                </div>

                <div className={styles.cartBillItem}>
                  <span>Discount</span>
                  <span className={styles.discount}>{totalCartAmount > 2000 ? `- ₹ ${discount}` : "-"}</span>
                </div>
                <div className={styles.cartBillItem}>
                  <span>Delivery Charges</span>
                  <span className={totalCartAmount > 1500 && styles.discount}>{totalCartAmount > 1500 ? "Free" : `₹ ${deliveryCharges}`}</span>
                </div>
                <div className={styles.total}>
                  <span>Total Amount</span>
                  <span>₹ {checkoutTotal}</span>
                </div>
              </div>
              <button className={styles.checkout} onClick={() => navigate("/checkout")}>
                PLACE ORDER
              </button>
            </div>
          </>
        ) : (
          <div className={styles.cartEmpty}>
            <img src="https://tss-static-images.gumlet.io/emptyCart.png" alt="cart" className={styles.empty} />
            <div className={styles.cartInfo}>
              <span className={styles.lonelyText}>Your shopping cart is empty.</span>
              <span className={styles.addText}> Please add something soon, carts have feelings too.</span>
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
