import Navbar from "../Components/Navbar";
import styles from "./userDetails.module.css";
import { AuthContext } from "..";
import { useContext } from "react";

export const Userdetails = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />

      <div className={styles.userDetailsParent}>
        <div className={styles.userDetailsContainer}>
          <div className={styles.userInfo}>
            <h4>User Info</h4>
            <p>
              Name : {user.firstName} {user.lastName}
            </p>
            <p>Email : {user.email}</p>
          </div>
          <div className={styles.addressForm}></div>
        </div>
      </div>
    </>
  );
};
