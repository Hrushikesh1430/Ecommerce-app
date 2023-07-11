import styles from "./features.module.css";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

const Features = () => {
  return (
    <section className={styles.featureParent}>
      <div className={styles.featureWrapper}>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <LocalShippingOutlinedIcon className={styles.icon} />
          </div>
          <div className={styles.featureText}>
            <span>Free Shipping</span>
            <span>On order of ₹250 or above</span>
          </div>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <PaymentOutlinedIcon className={styles.icon} />
          </div>
          <div className={styles.featureText}>
            <span>Card Payments</span>
            <span>12 months installments</span>
          </div>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <ThumbUpAltOutlinedIcon className={styles.icon} />
          </div>
          <div className={styles.featureText}>
            <span>Easy Returns</span>
            <span>Shop with confidence</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
