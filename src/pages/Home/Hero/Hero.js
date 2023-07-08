import styles from "./Hero.module.css";

import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import WomanYellow from "../../../assets/Hero/women-hero-1.png";
import WomanPink from "../../../assets/Hero/slider-2.png";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PrevArrow from "../../../Components/Arrows/PrevArrow";
import RightArrow from "../../../Components/Arrows/RightArrow";

const Hero = () => {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    cssEase: "ease-in-out",
    prevArrow: <PrevArrow className={styles.leftHero} />,
    nextArrow: <RightArrow className={styles.rightHero} />,
  };
  return (
    <>
      <section className={styles.heroParent}>
        <Slider {...settings}>
          <div>
            <div className={styles.heroWrapper}>
              <div className={styles.heroLeft}>
                <div className={styles.heroLeftText}>
                  <span className={styles.offer}> SUMMER COLLECTION</span>
                  <div className={styles.sale}>
                    <span className={styles.subText}>SALE UPTO</span>
                    <span className={styles.saleDiscount}>50% OFF</span>
                  </div>
                  <button className={styles.shop}>
                    SHOP NOW <LocalMallOutlinedIcon />
                  </button>
                </div>
              </div>
              <div className={styles.heroRight}>
                <img src={WomanYellow} alt="HeroWoman" />
              </div>
            </div>
          </div>
          <div>
            <div className={styles.heroWrapper2}>
              <div className={styles.heroLeft}>
                <div className={styles.heroLeftText}>
                  <span className={styles.offer}> OFFER 2023</span>
                  <div className={styles.sale}>
                    <span className={styles.subText}>SALE UPTO</span>
                    <span className={styles.saleDiscount}>60% OFF</span>
                  </div>
                  <button className={styles.shop}>
                    SHOP NOW <LocalMallOutlinedIcon />
                  </button>
                </div>
              </div>
              <div className={styles.heroRight}>
                <img src={WomanPink} alt="HeroWoman" />
              </div>
            </div>
          </div>
        </Slider>
      </section>
    </>
  );
};

export default Hero;
