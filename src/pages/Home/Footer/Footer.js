import styles from "./footer.module.css";
import FooterLogo from "../../../assets/Footer/logo-white.png";

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

import payment from "../../../assets/Footer/payment.png";

const Footer = () => {
  return (
    <section className={styles.footerParent}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerLogo}>
          <img src={FooterLogo} alt="footerLogo" />
          <div className={styles.aboutText}>
            <span>
              Lorem ipsum dolor sit amet consectet adipisicing elit, sed do eiusmod templ incididunt ut labore et dolore magnaol aliqua Ut enim ad
              minim.
            </span>
            <ul>
              <li>{<FacebookOutlinedIcon />}</li>
              <li>{<TwitterIcon />}</li>
              <li>{<InstagramIcon />}</li>
            </ul>
          </div>
        </div>
        <div className={styles.footerAddress}>
          <div className={styles.addressWrapper}>
            <span className={styles.storeTitle}>Store Information</span>
            <span>Platina, C.59, G Block, Bandra Kurla Complex, Near Citibank, Bandra East, 400051 </span>
            <span>Phone : +91-8102410075</span>
            <span>Email : support@meridukan.com</span>
            <img src={payment} alt="paymenticons" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
