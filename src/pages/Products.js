import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./products.module.css";

import Navbar from "../Components/Navbar";
import AllenSolly from "../assets/men/Allen_Solly_Jacket.jpg";

import { AuthContext, CartContext, WishListContext } from "..";
import { DataContext, DataContextProvider } from "../Context/DataContext";

const Products = () => {
  const navigate = useNavigate();

  // usertoken = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JmZmU0Yy1mYjUwLTQ2NjEtOTZmOC01YWEwOTNjNDE0YTEiLCJlbWFpbCI6ImhkdGF3ZGVAZ21haWwuY29tIn0.lHuCh3AbbV5_HUP771IKdyUognhckf4dleARPrd4RA4

  const { userToken } = useContext(AuthContext);

  const { wishList, addToWishList } = useContext(WishListContext);

  const { cart, addCartHandler } = useContext(CartContext);

  const { state, dispatch } = useContext(DataContext);

  const getProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      dispatch({ type: "INITIAL_FETCH", payLoad: data.products });
    } catch (e) {}
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    let finalList = [];
    let categoryArr = filterByCategory();
    let sizeArr = filterBySize(categoryArr);
    let ratingArr = filterByRating(sizeArr);
    let sortedArr = sortProduct(ratingArr);
    let priceSliderArr = sortbyPriceSlider(sortedArr);

    finalList = priceSliderArr.length > 0 ? priceSliderArr : finalList;
    dispatch({ type: "SET_FILTERED_PRODUCTS", payLoad: finalList });
  }, [state.categoryCheck, state.sizeCheck, state.rating, state.sortOrder, state.price]);

  const filterByCategory = () => {
    let filteredbyCat = [];
    for (let i = 0; i < state.categoryCheck.length; i++) {
      let tempCat = state.intialProductList.filter(({ categoryName }) => state.categoryCheck[i] === categoryName);
      filteredbyCat.push(...tempCat);
    }
    return filteredbyCat.length > 0 ? filteredbyCat : state.intialProductList;
  };
  const filterBySize = (array) => {
    let filteredbySize = [];
    for (let i = 0; i < state.sizeCheck.length; i++) {
      let tempSize = array.filter(({ size }) => state.sizeCheck[i] === size);
      filteredbySize.push(...tempSize);
    }
    return filteredbySize.length > 0 ? filteredbySize : array;
  };
  const filterByRating = (array) => {
    let tempRating = array.filter(({ rating }) => Number(rating) >= Number(state.rating));
    tempRating.sort((a, b) => Number(b.rating) - Number(a.rating));
    return tempRating.length > 0 ? tempRating : array;
  };
  const sortProduct = (array) => {
    let tempSorted =
      state.sortOrder === "low" ? array.sort((a, b) => Number(a.price) - Number(b.price)) : array.sort((a, b) => Number(b.price) - Number(a.price));
    return tempSorted.length > 0 ? tempSorted : array;
  };
  const sortbyPriceSlider = (array) => {
    let tempSortedPrice = array.filter(({ price }) => Number(price) <= Number(state.price));

    console.log("tempSorted", tempSortedPrice);
    return tempSortedPrice.length > 0 ? tempSortedPrice : [];
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS", payLoad: "" });
  };
  console.log(state.price);
  return (
    <>
      <Navbar />
      <h1 className={styles.productTitle}>Products</h1>
      <div className={styles.productParent}>
        <div className={styles.filters}>
          <div className={styles.filterHeader}>
            <h2>Filters</h2>
            <p onClick={() => clearFilters()} className={styles.clear}>
              Clear
            </p>
          </div>
          <div className={styles.categories}>
            <h4>Categories</h4>
            <div>
              <input
                type="checkbox"
                value="Men"
                onChange={(e) =>
                  dispatch({
                    type: "FILTER_BY_CATEGORY",
                    payLoad: {
                      checked: e.target.checked,
                      value: e.target.value,
                    },
                  })
                }
                checked={state.categoryCheck.includes("Men")}
              />
              <label>Men</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="Women"
                onChange={(e) =>
                  dispatch({
                    type: "FILTER_BY_CATEGORY",
                    payLoad: {
                      checked: e.target.checked,
                      value: e.target.value,
                    },
                  })
                }
                checked={state.categoryCheck.includes("Women")}
              />
              <label>Women</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="Kids"
                onChange={(e) =>
                  dispatch({
                    type: "FILTER_BY_CATEGORY",
                    payLoad: {
                      checked: e.target.checked,
                      value: e.target.value,
                    },
                  })
                }
                checked={state.categoryCheck.includes("Kids")}
              />
              <label>Kids</label>
            </div>
          </div>
          <div className={styles.sizes}>
            <h4>Sizes</h4>
            <div>
              <input
                type="checkbox"
                value="S"
                onChange={(e) =>
                  dispatch({
                    type: "FILTER_BY_SIZE",
                    payLoad: {
                      checked: e.target.checked,
                      value: e.target.value,
                    },
                  })
                }
                checked={state.sizeCheck.includes("S")}
              />
              <label>S</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="M"
                onChange={(e) =>
                  dispatch({
                    type: "FILTER_BY_SIZE",
                    payLoad: {
                      checked: e.target.checked,
                      value: e.target.value,
                    },
                  })
                }
                checked={state.sizeCheck.includes("M")}
              />
              <label>M</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="L"
                onChange={(e) =>
                  dispatch({
                    type: "FILTER_BY_SIZE",
                    payLoad: {
                      checked: e.target.checked,
                      value: e.target.value,
                    },
                  })
                }
                checked={state.sizeCheck.includes("L")}
              />
              <label>L</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="XL"
                onChange={(e) =>
                  dispatch({
                    type: "FILTER_BY_SIZE",
                    payLoad: {
                      checked: e.target.checked,
                      value: e.target.value,
                    },
                  })
                }
                checked={state.sizeCheck.includes("XL")}
              />
              <label>XL</label>
            </div>
          </div>
          <div className={styles.rating}>
            <h4>Rating</h4>
            <div>
              <input
                type="radio"
                value="4"
                name="rating"
                onChange={(e) =>
                  dispatch({
                    type: "FILTER_BY_RATING",
                    payLoad: e.target.value,
                  })
                }
                checked={state.rating === "4"}
              />
              <label>4 stars and above</label>
            </div>
            <div>
              <input
                type="radio"
                value="3"
                name="rating"
                onChange={(e) =>
                  dispatch({
                    type: "FILTER_BY_RATING",
                    payLoad: e.target.value,
                  })
                }
                checked={state.rating === "3"}
              />
              <label>3 stars and above</label>
            </div>
            <div>
              <input
                type="radio"
                value="2"
                name="rating"
                onChange={(e) =>
                  dispatch({
                    type: "FILTER_BY_RATING",
                    payLoad: e.target.value,
                  })
                }
                checked={state.rating === "2"}
              />
              <label>2 stars and above</label>
            </div>
            <div>
              <input
                type="radio"
                value="1"
                name="rating"
                onChange={(e) =>
                  dispatch({
                    type: "FILTER_BY_RATING",
                    payLoad: e.target.value,
                  })
                }
                checked={state.rating === "1"}
              />
              <label>1 stars and above</label>
            </div>
          </div>
          <div className={styles.priceFilter}>
            <h4>Sort by Price</h4>
            <div>
              <input
                type="radio"
                value="low"
                name="price"
                onChange={(e) =>
                  dispatch({
                    type: "SORT_PRODUCTS",
                    payLoad: e.target.value,
                  })
                }
                checked={state.sortOrder === "low"}
              />
              <label>price - Low to High</label>
            </div>
            <div>
              <input
                type="radio"
                value="high"
                name="price"
                onChange={(e) =>
                  dispatch({
                    type: "SORT_PRODUCTS",
                    payLoad: e.target.value,
                  })
                }
                checked={state.sortOrder === "high"}
              />
              <label>price - High to Low</label>
            </div>
          </div>
          <div className={styles.priceSlider}>
            <h4>Price Range</h4>
            <div>
              <div className={styles.slideContainer}>
                <input
                  type="range"
                  min="1"
                  max="2000"
                  onChange={(e) =>
                    dispatch({
                      type: "PRICE_SLIDER",
                      payLoad: e.target.value,
                    })
                  }
                  value={state.price}
                  className={styles.slider}
                  id="myRange"
                />
                <br />
                <label>{state.price}</label>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.productContainer}>
          {state.filteredProducts.length > 0 ? (
            state.filteredProducts.map((item) => (
              <div className={styles.productCard}>
                <img src={AllenSolly} alt={item.name} />
                <p>{item.brand}</p>
                <p>Category: {item.categoryName}</p>
                <p>Rating: {item.rating}</p>
                <p>size: {item.size}</p>
                <p>size: {item.price}</p>

                <p className={styles.name}>{item.name}</p>
                <div className={styles.buttonContainer}>
                  {cart.find((cartItem) => cartItem._id === item._id) ? (
                    <button className={styles.addWishList} onClick={() => navigate("/cart")}>
                      Go to Cart
                    </button>
                  ) : (
                    <button className={styles.addWishList} onClick={() => addCartHandler(item)}>
                      Add to Cart
                    </button>
                  )}
                  {wishList.find((wishListItem) => wishListItem._id === item._id) ? (
                    <button className={styles.addWishList} onClick={() => navigate("/wishlist")}>
                      Go to WishList
                    </button>
                  ) : (
                    <button className={styles.addWishList} onClick={() => addToWishList(item)}>
                      Add to WishList
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No items found</p>
          )}
        </div>
      </div>
    </>
  );
};
export default Products;
