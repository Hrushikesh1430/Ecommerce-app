import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./products.module.css";

import Navbar from "../Components/Navbar";
import AllenSolly from "../assets/men/Allen_Solly_Jacket.jpg";

import { AuthContext, CartContext } from "..";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const { userToken } = useContext(AuthContext);

  const { state, dispatch } = useContext(CartContext);

  const getProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.products);
      //   setProducts(data.categories);
    } catch (e) {}
  };

  const getCartItemsAPI = async () => {
    const url = "/api/user/cart";
    const config = {
      method: "GET",
      headers: {
        authorization: userToken,
      },
    };
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      console.log(data);
      //   setProducts(data.categories);
    } catch (e) {}
  };

  const addCartAPI = async (product) => {
    const url = "/api/user/cart";
    const config = {
      method: "POST",
      headers: {
        authorization: userToken,
      },
      body: JSON.stringify(product),
    };
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      dispatch({ type: "ADD_ITEM", payLoad: product });
    } catch (e) {}
  };

  console.log("cartiTEMS", state.cart);
  const addCartHandler = (product) => {
    userToken ? addCartAPI(product) : navigate("/login");
    getCartItemsAPI();
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Navbar />
      <div className={styles.productParent}>
        <h1 className={styles.productTitle}>Products</h1>
        <div className={styles.productContainer}>
          {products.map((item) => (
            <div className={styles.productCard}>
              <img src={AllenSolly} alt={item.name} />
              <p>{item.brand}</p>
              <p className={styles.name}>{item.name}</p>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.addCart}
                  onClick={() => addCartHandler(item)}
                >
                  Add to Cart
                </button>
                <button className={styles.addWishList}>Add to WishList</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Products;
