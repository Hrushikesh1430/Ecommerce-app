import { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import styles from "./loader.module.css";
import Backdrop from "@mui/material/Backdrop";

const Loader = () => {
  const { loader } = useContext(DataContext);
  return (
    <>
      <div className={styles.loaderBackground}>
        {/* <div className={styles.shapes}> </div> */}
        <div className={styles.loaderParent}>
          <span className={styles.loader}></span>
          <span className={styles.loaderText}>Loading</span>
        </div>
      </div>
    </>
  );
};
export default Loader;
