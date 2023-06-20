import Navbar from "../Components/Navbar";
import styles from "./userDetails.module.css";
import { AuthContext, DataContext } from "..";
import { useContext, useEffect, useState } from "react";

export const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { address } = useContext(DataContext);

  const [currentChecked, setCurrentChecked] = useState(0);
  const [currentAddress, setCurrentAddress] = useState("");

  useEffect(() => {
    setCurrentAddress(address.find((item) => item.userId === user.id));
  }, [user]);

  const addressChangeHandler = (value, index) => {
    const address = JSON.parse(value);
    setCurrentChecked(index);
    setCurrentAddress(address);
  };

  console.log(currentAddress);
  return (
    <>
      <Navbar />

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

              {address.map(
                (item, index) =>
                  item.userId === user.id && (
                    <div className={styles.address}>
                      <input
                        type="radio"
                        name="address"
                        value={JSON.stringify(item)}
                        onChange={(e) =>
                          addressChangeHandler(e.target.value, index)
                        }
                        checked={currentChecked === index}
                      />
                      <label htmlFor="address">
                        <p>Name : {item.name}</p>
                        <p>Address : {item.address}</p>
                        <p>Phone : {item.phone}</p>
                      </label>
                    </div>
                  )
              )}
            </div>
          </div>

          <div className={styles.addressForm}></div>
        </div>
      </div>
    </>
  );
};
