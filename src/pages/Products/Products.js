import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./products.module.css";
import Navbar from "../../Components/Navbar/Navbar";

import { AuthContext, CartContext, WishListContext } from "../..";
import { DataContext } from "../../Context/DataContext";

import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import Footer from "../Home/Footer/Footer";

import Drawer from "@mui/material/Drawer";

const Products = () => {
  const navigate = useNavigate();

  // usertoken = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JmZmU0Yy1mYjUwLTQ2NjEtOTZmOC01YWEwOTNjNDE0YTEiLCJlbWFpbCI6ImhkdGF3ZGVAZ21haWwuY29tIn0.lHuCh3AbbV5_HUP771IKdyUognhckf4dleARPrd4RA4

  const { userToken } = useContext(AuthContext);

  const { wishList, addToWishList } = useContext(WishListContext);

  const { cart, addCartHandler } = useContext(CartContext);

  const { state, dispatch, AppDevice } = useContext(DataContext);

  const [filterDrawer, setFilterDrawer] = useState(false);
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

  const Filters = () => {
    return (
      <>
        <div className={styles.filters}>
          <div className={styles.filterHeader}>
            <span className={styles.filterMain}>Filters</span>
            <span onClick={() => clearFilters()} className={styles.clear}>
              Clear
            </span>
          </div>
          <div className={styles.categoryContainer}>
            <div className={styles.categories}>
              <span className={styles.filterTitle}>Categories</span>
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
              <span className={styles.filterTitle}>Sizes</span>
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
              <span className={styles.filterTitle}>Rating</span>
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
              <span className={styles.filterTitle}>Sort by Price</span>
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
                <label>Price - Low to High</label>
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
                <label>Price - High to Low</label>
              </div>
            </div>
            <div className={styles.priceSlider}>
              <span className={styles.filterTitle}>Price Range</span>
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
                  <div className={styles.priceRange}>
                    <span>0</span>
                    <span>1000</span>
                    <span>2000</span>
                  </div>
                  {/* <label>{state.price}</label> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  console.log("filtered", state.filteredProducts);

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
    return tempSortedPrice.length > 0 ? tempSortedPrice : [];
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS", payLoad: "" });
  };

  return (
    <>
      <Navbar />
      <section className={styles.productParent}>
        {AppDevice === 1 && <Filters />}

        <div className={styles.productContainerParent}>
          <div className={styles.productHeader}>
            <span className={styles.showResults}>Showing Results for All Products</span>
            <button className={styles.showFilter} onClick={() => setFilterDrawer(true)}>
              Filters
            </button>
          </div>

          <div className={styles.productContainer}>
            {state.filteredProducts.length > 0 ? (
              state.filteredProducts.map((item, index) => (
                <div className={styles.productCard} onClick={() => navigate(`/product/${item._id}`)}>
                  <div className={styles.heart}>
                    <FavoriteIcon
                      className={`${styles.heartIcon} ${wishList.find((wishListItem) => wishListItem._id === item._id) && styles.fill}`}
                      sx={{ stroke: wishList.find((wishListItem) => wishListItem._id === item._id) ? "transparent" : "#000000", strokeWidth: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWishList(item);
                      }}
                    />
                  </div>
                  <div className={styles.productImage}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className={styles.productInfo}>
                    <div className={styles.review}>
                      <ReviewStars rating={item.rating} />
                    </div>
                    <span className={styles.brand}>{item.brand}</span>
                    {/* <p>Category: {item.categoryName}</p> */}

                    {/* <p>size: {item.size}</p>
                    <p>size: {item.price}</p> */}

                    <span className={styles.name}>{item.name}</span>
                    <div className={styles.priceContainer}>
                      <span className={styles.productPrice}>₹ {item.price}</span>
                      <span className={styles.discount}>₹ 8000</span>
                    </div>
                    <div className={styles.buttonContainer}>
                      {cart.find((cartItem) => cartItem._id === item._id) ? (
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
                            addCartHandler(item);
                          }}
                        >
                          Add to Cart
                        </button>
                      )}
                      {/* {wishList.find((wishListItem) => wishListItem._id === item._id) ? (
                        <button className={styles.addWishList} onClick={() => navigate("/wishlist")}>
                          Go to WishList
                        </button>
                      ) : (
                        <button className={styles.addWishList} onClick={() => addToWishList(item)}>
                          Add to WishList
                        </button>
                      )} */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No items found</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
      {AppDevice === 0 && (
        <div className={styles.bottomParent}>
          <Drawer anchor={"bottom"} className={`${styles.customDrawer}`} open={filterDrawer} onClose={() => setFilterDrawer(false)}>
            <button className={styles.close} onClick={() => setFilterDrawer(false)}>
              <CloseOutlinedIcon />
            </button>
            <div className={styles.drawerWrapper}>
              <Filters />
            </div>
          </Drawer>
        </div>
      )}
    </>
  );
};
export default Products;
