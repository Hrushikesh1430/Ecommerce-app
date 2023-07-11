import styles from "./footer.module.css";
import FooterLogo from "../../../assets/Footer/logo-white.png";

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import CopyrightIcon from "@mui/icons-material/Copyright";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
              <li>
                <a href="https://www.facebook.com/hrushikesh.tawde/" target="__blank">
                  <FacebookOutlinedIcon />
                </a>
              </li>
              <li>
                <a href="http://www.linkedin.com/in/hrushikesh-tawde-0031511a4/" target="__blank">
                  <TwitterIcon />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/hrushikesh.tawde/" target="__blank">
                  <InstagramIcon />
                </a>
              </li>
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
      <div className={styles.footerBox}>
        <span>
          <span>
            <CopyrightIcon className={styles.copy} />
            2023 No Copyright.
          </span>
          <span>Feel free to make it yours!</span>
          <FavoriteIcon className={styles.heart} />
        </span>
      </div>
    </section>
  );
};

export default Footer;
