import { useEffect, useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import styles from "./wishList.module.css";

import Navbar from "../../Components/Navbar/Navbar";

import AllenSolly from "../../assets/men/Allen_Solly_Jacket.jpg";
import EmptyWishList from "../../assets/Wishlist/empty.png";

import { AuthContext, CartContext, WishListContext } from "../..";

import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import Footer from "../Home/Footer/Footer";

const WishList = () => {
  const navigate = useNavigate();

  const { wishList, addToWishList, deleteWishList, getWishListAPI } = useContext(WishListContext);
  const ReviewStars = ({ rating }) => {
    const starArr = [1, 2, 3, 4, 5];
    let userRating = parseInt(rating);
    return (
      <>
        <div className={styles.starContainer}>
          {starArr.map(() => {
            userRating = userRating - 1;
            return <StarIcon className={`${styles.star} ${userRating > -1 && styles.starfill}`} />;
          })}
        </div>
        <span className={styles.average}>({rating} Average review)</span>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <section className={styles.WishListContainer}>
        {wishList.length > 0 && <span className={styles.title}>My WishList ({wishList.length})</span>}

        {wishList.length > 0 ? (
          <div className={styles.productContainer}>
            {wishList.map((item, index) => (
              <div className={styles.productCard} onClick={() => navigate(`/product/${item._id}`)}>
                <div className={styles.close}>
                  <CloseOutlinedIcon
                    sx={{ stroke: "transparent", strokeWidth: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteWishList(item._id);
                    }}
                  />
                </div>
                <div className={styles.productImage}>
                  <img src={AllenSolly} alt={item.name} />
                </div>
                <div className={styles.productInfo}>
                  <span className={styles.brand}>{item.brand}</span>

                  <span className={styles.name}>{item.name}</span>
                  <div className={styles.priceContainer}>
                    <span className={styles.productPrice}>₹ {item.price}</span>
                    <span className={styles.discount}>₹ 8000</span>
                  </div>
                  <div className={styles.buttonContainer}>
                    <button className={styles.addCart}>Add to Cart</button>
                    {/* {wishList.find((wishListItem) => wishListItem._id === item._id) ? (
                      <button className={styles.addWishList} onClick={() => deleteWishList(item._id)}>
                        Remove from WishList
                      </button>
                    ) : (
                      <button className={styles.addWishList} onClick={() => addToWishList(item)}>
                        Add to WishList
                      </button>
                    )} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.wishListEmpty}>
            <img src={EmptyWishList} alt="empty" className={styles.empty} />
            <div className={styles.wishListInfo}>
              <span className={styles.lonelyText}>Your wishlist is lonely and looking for love.</span>
              <span className={styles.addText}>Add products to your wishlist, review them anytime and easily move to cart.</span>
            </div>
            <button onClick={() => navigate("/products")}>Continue Shopping</button>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default WishList;
