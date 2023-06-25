import Navbar from "../Components/Navbar";
import styles from "./checkout.module.css";

import { Navigate } from "react-router-dom";
import { AuthContext, CartContext, DataContext } from "..";
import { useContext, useEffect, useState } from "react";

export const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { address, deliveryCharges, checkoutTotal, setcheckOutTotal } = useContext(DataContext);

  const { cart, totalCartAmount } = useContext(CartContext);

  const [currentAddress, setCurrentAddress] = useState("");

  useEffect(() => {
    setcheckOutTotal(totalCartAmount + deliveryCharges);
  }, []);

  const addressChangeHandler = (value, index) => {
    setCurrentAddress(address.find((item) => item.id === value));
  };

  if (!cart.length > 0) {
    return <Navigate to="/products" replace />;
  }

  return (
    <>
      <Navbar />
      <>
        <div className={styles.checkoutParent}>
          <div className={styles.addressList}>
            <h3>Address Details</h3>
            {address.map(
              (item, index) =>
                item.userId === user.id && (
                  <>
                    <input
                      type="radio"
                      name="address"
                      value={item.id}
                      onChange={(e) => addressChangeHandler(e.target.value, index)}
                      checked={currentAddress.id === item.id}
                    />
                    <label htmlFor="address">
                      <p>Name : {item.name}</p>
                      <p>Address : {item.address}</p>
                      <p>Phone : {item.phone}</p>
                    </label>
                  </>
                )
            )}
          </div>
          <div className={styles.billingDetails}>
            <h3>Order summary</h3>
            <div className={styles.billCard}>
              <div className={styles.cartItems}>
                <span>Items ({cart.length}):</span>
                <span>{totalCartAmount}</span>
              </div>
              <div className={styles.cartItems}>
                <span>Delivery:</span>
                <span>100</span>
              </div>
              <div className={styles.cartItems}>
                <span>Total:</span>
                <span>{checkoutTotal}</span>
              </div>
            </div>
            <button>Checkout</button>
          </div>
        </div>
      </>
    </>
  );
};
