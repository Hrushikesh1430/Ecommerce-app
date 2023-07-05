import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext, DataContext, WishListContext } from "..";
import Navbar from "../Components/Navbar/Navbar";
import styles from "./product.module.css";
import AllenSolly from "../assets/men/Allen_Solly_Jacket.jpg";

export const Product = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const { state } = useContext(DataContext);
  const { cart, addCartHandler } = useContext(CartContext);
  const { addToWishList, wishList } = useContext(WishListContext);

  const product = state.intialProductList.find(({ _id }) => productId === _id);

  return (
    <>
      <Navbar />
      {product ? (
        <div className={styles.productParent}>
          <div className={styles.productContainer}>
            <div className={styles.productCard}>
              <div className={styles.productImage}>
                <img src={AllenSolly} alt="product_image" />
              </div>
              <div className={styles.productInfo}>
                <p>{product.brand}</p>
                <p>{product.name}</p>
                <p>{product.price}</p>

                <div className={styles.buttonContainer}>
                  {cart.find((cartItem) => cartItem._id === product._id) ? (
                    <button className={styles.addWishList} onClick={() => navigate("/cart")}>
                      Go to Cart
                    </button>
                  ) : (
                    <button className={styles.addWishList} onClick={() => addCartHandler(product)}>
                      Add to Cart
                    </button>
                  )}
                  {wishList.find((wishListItem) => wishListItem._id === product._id) ? (
                    <button className={styles.addWishList} onClick={() => navigate("/wishlist")}>
                      Go to WishList
                    </button>
                  ) : (
                    <button className={styles.addWishList} onClick={() => addToWishList(product)}>
                      Add to WishList
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className={styles.notFound}>Product not found</p>
      )}
    </>
  );
};
