import Navbar from "../../Components/Navbar/Navbar";
import styles from "./checkout.module.css";

import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext, CartContext, DataContext } from "../..";
import { useContext, useEffect, useState } from "react";
import { validate } from "uuid";
import Footer from "../Home/Footer/Footer";
import { CustomModal } from "../../Components/CustomModal";
import { AddressForm } from "../../Components/AddressForm";
import { alertTitleClasses } from "@mui/material";

export const Checkout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { address, deliveryCharges, discount } = useContext(DataContext);

  const { cart, totalCartAmount } = useContext(CartContext);
  const [addressModal, setAddressModal] = useState(false);

  const [currentAddress, setCurrentAddress] = useState("");

  const addressChangeHandler = (value, index) => {
    setCurrentAddress(address.find((item) => item.id === value));
  };

  const validateCheckout = () => {
    const addresses = address.filter((item, index) => item.userId === user.id);
    if (currentAddress === "" && addresses.length === 0) {
      alert("Please add an address to checkout");
    } else if (currentAddress === "" && addresses.length > 0) {
      alert("Please select an address to checkout");
    } else {
      alert("Proceed to payment");
    }
  };
  if (!cart.length > 0) {
    return <Navigate to="/products" replace />;
  }
  const checkoutTotal = totalCartAmount + (totalCartAmount < 1500 && deliveryCharges) - (totalCartAmount > 2000 && discount);
  return (
    <>
      <CustomModal onClose={() => setAddressModal(false)} modalOpen={addressModal}>
        <AddressForm edit={false} addressValue={currentAddress} setAddressModal={setAddressModal} />
      </CustomModal>
      <Navbar />
      <section className={styles.checkoutContainer}>
        <div className={styles.checkoutParent}>
          <div className={styles.addressList}>
            <span className={styles.addressTitle}>Delivery To</span>
            <div className={styles.addressContainer}>
              <div
                className={`${styles.addressItem} ${styles.add}`}
                onClick={() => {
                  setAddressModal(true);
                }}
              >
                <div className={`${styles.addressInfo}`}>
                  <span className={styles.addIcon}>+</span>
                  <span>Add New Address</span>
                </div>
              </div>
              {address.map(
                (item, index) =>
                  item.userId === user.id && (
                    <div className={styles.addressItem}>
                      <input
                        type="radio"
                        name="address"
                        value={item.id}
                        onChange={(e) => addressChangeHandler(e.target.value, index)}
                        checked={currentAddress.id === item.id}
                      />
                      <div className={styles.addressInfo}>
                        <span className={styles.username}>{item.name}</span>
                        <span>{item.residence}</span>
                        <span>{item.area}</span>
                        <span>{`${item.city}-${item.pincode}`}</span>

                        <span>Mobile : {item.phone}</span>
                      </div>
                    </div>
                  )
              )}
            </div>
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
            <button className={styles.checkout} onClick={() => validateCheckout()}>
              CONFIRM ORDER
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
