import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext, DataContext, WishListContext } from "../..";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./product.module.css";
import Footer from "../Home/Footer/Footer";

import NotFound from "../../assets/Product/notfound.png";

import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

export const Product = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const { state } = useContext(DataContext);
  const { cart, addCartHandler } = useContext(CartContext);
  const { addToWishList, wishList, deleteWishList } = useContext(WishListContext);

  const product = state.intialProductList.find(({ _id }) => productId === _id);
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
      <div className={styles.productParent}>
        {product ? (
          <div className={styles.productContainer}>
            <div className={styles.productCard} onClick={() => navigate(`/product/${product._id}`)}>
              <div className={styles.productImage}>
                <div className={styles.heart}>
                  <FavoriteIcon
                    className={`${styles.heartIcon} ${wishList.find((wishListproduct) => wishListproduct._id === product._id) && styles.fill}`}
                    sx={{
                      stroke: wishList.find((wishListproduct) => wishListproduct._id === product._id) ? "transparent" : "#000000",
                      strokeWidth: 1,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      wishList.find((wishListItem) => wishListItem._id === product._id) ? deleteWishList(product._id) : addToWishList(product);
                    }}
                  />
                </div>
                <img src={product.image} alt={product.name} />
              </div>
            </div>
            <div className={styles.productInfo}>
              <span className={styles.brand}>{product.brand}</span>
              {/* <p>Category: {product.categoryName}</p> */}

              {/* <p>size: {product.size}</p>
                    <p>size: {product.price}</p> */}

              <span className={styles.name}>{product.name}</span>
              <div className={styles.priceContainer}>
                <span className={styles.productPrice}>₹ {product.price}</span>
                <span className={styles.discount}>₹ 8000</span>
              </div>
              <span className={styles.name}>Size available : {product.size}</span>
              <div className={styles.review}>
                <ReviewStars rating={product.rating} />
              </div>
              <div className={styles.buttonContainer}>
                {cart.find((cartproduct) => cartproduct._id === product._id) ? (
                  <button
                    className={styles.addCart}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/cart");
                    }}
                  >
                    Go to Cart
                  </button>
                ) : (
                  <button
                    className={styles.addCart}
                    onClick={(e) => {
                      e.stopPropagation();
                      addCartHandler(product);
                    }}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.wishListEmpty}>
            <img src={NotFound} alt="empty" className={styles.empty} loading="lazy" />
            <div className={styles.wishListInfo}>
              <span className={styles.lonelyText}>We can't find the product you're looking for.</span>
            </div>
            <button onClick={() => navigate("/products")}>Continue Shopping</button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};
