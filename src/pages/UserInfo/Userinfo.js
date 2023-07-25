import Navbar from "../../Components/Navbar/Navbar";
import styles from "./userDetails.module.css";
import { AuthContext, DataContext } from "../..";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AddressForm } from "../../Components/AddressForm/AddressForm";
import { CustomModal } from "../../Components/CustomModal/CustomModal";
import Footer from "../Home/Footer/Footer";

export const Userdetails = () => {
  const { user } = useContext(AuthContext);
  const { address, setAddress } = useContext(DataContext);

  const [currentAddress, setCurrentAddress] = useState({});

  const [edit, setEdit] = useState(false);
  const [addressModal, setAddressModal] = useState(false);

  const deleteAddressHandler = (addressItem) => {
    setAddress((address) => address.filter((item) => item.id !== addressItem.id));
  };

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <CustomModal onClose={() => setAddressModal(false)} modalOpen={addressModal}>
        <AddressForm edit={edit} addressValue={currentAddress} setAddressModal={setAddressModal} />
      </CustomModal>

      <div className={styles.userDetailsParent}>
        <div className={styles.userDetailsContainer}>
          <div className={styles.userInfo}>
            <span className={styles.addressTitle}>USER INFO</span>
            <span>
              Name : {user.firstName} {user.lastName}
            </span>
            <span>Email : {user.email}</span>
          </div>
          <div className={styles.addressList}>
            <span className={styles.addressTitle}>ADDRESSES</span>
            <div className={styles.addressContainer}>
              <div
                className={`${styles.addressItem} ${styles.add}`}
                onClick={() => {
                  setAddressModal(true);
                  setEdit(false);
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
                      <div className={styles.addressInfo}>
                        <span className={styles.username}>{item.name}</span>
                        <span>{item.residence}</span>
                        <span>{item.area}</span>
                        <span>{`${item.city}-${item.pincode}`}</span>
                        <span>Mobile : {item.phone}</span>
                        <div className={styles.buttonContainer}>
                          <button
                            onClick={() => {
                              setAddressModal(true);
                              setEdit(true);
                              setCurrentAddress(item);
                            }}
                          >
                            Edit
                          </button>
                          <button onClick={() => deleteAddressHandler(item)}>Delete</button>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* <div className={styles.userDetailsParent}>
        <div className={styles.userDetailsContainer}>
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfo}>
              <h4>User Info</h4>
              <p>
                Name : {user.firstName} {user.lastName}
              </p>
              <p>Email : {user.email}</p>
            </div>
            <div className={styles.addressContainer}>
              <h3>Addresses</h3>
              <button
                className={styles.addAddress}
                onClick={() => {
                  setAddressModal(true);
                  setEdit(false);
                }}
              >
                Add address
              </button>

              {address.map(
                (item, index) =>
                  item.userId === user.id && (
                    <div className={styles.address}>
                      <p>Name : {item.name}</p>
                      <p>Address : {`${item.residence} ${item.area} ${item.city}-${item.pincode} ${item.state}`}</p>
                      <p>Phone : {item.phone}</p>

                      <button
                        onClick={() => {
                          setAddressModal(true);
                          setEdit(true);
                          setCurrentAddress(item);
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteAddressHandler(item)}>Delete</button>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
