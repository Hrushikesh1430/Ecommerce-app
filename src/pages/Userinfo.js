import Navbar from "../Components/Navbar";
import styles from "./userDetails.module.css";
import { AuthContext, DataContext } from "..";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AddressForm } from "../Components/AddressForm";
import { CustomModal } from "../Components/CustomModal";

export const Userdetails = () => {
  const { user } = useContext(AuthContext);
  const { address, setAddress } = useContext(DataContext);

  const [edit, setEdit] = useState(false);
  const [addressValue, setAddressValue] = useState({});

  const [addressModal, setAddressModal] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <CustomModal
        onClose={() => setAddressModal(false)}
        modalOpen={addressModal}
      >
        <AddressForm
          edit={edit}
          addressValue={addressValue}
          setAddressModal={setAddressModal}
        />
      </CustomModal>

      <div className={styles.userDetailsParent}>
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
                      <p>
                        Address :{" "}
                        {`${item.residence} ${item.area} ${item.city}-${item.pincode} ${item.state}`}
                      </p>
                      <p>Phone : {item.phone}</p>

                      <button
                        onClick={() => {
                          setAddressModal(true);
                          setEdit(true);
                          setAddressValue(item);
                        }}
                      >
                        Edit
                      </button>
                      <button>Delete</button>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
