import { useContext, useEffect, useState } from "react";
import styles from "./categories.module.css";
import { DataContext, DataContextProvider } from "../../..";
import { useNavigate } from "react-router";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

import Women from "../../../assets/CategorySection/Women.jpg";
import Men from "../../../assets/CategorySection/Men.jpg";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { state, dispatch } = useContext(DataContext);
  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data.categories);
    } catch (e) {}
  };

  const categoryHandler = (category) => {
    if (!state.categoryCheck.includes(category)) {
      dispatch({
        type: "FILTER_BY_CATEGORY",
        payLoad: {
          checked: true,
          value: category,
        },
      });
    }

    navigate("/products");
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <section className={styles.categoryParent}>
        <div className={styles.categoryWrapper}>
          <div className={styles.categoryBox}>
            <img src={Men} alt="categroyMen" />
            <div className={styles.categoryName}>
              <div>
                <span>Best Collection </span>
                <span>For Men</span>
              </div>
              <button className={styles.shop} onClick={() => categoryHandler("Men")}>
                SHOP NOW <LocalMallOutlinedIcon className={styles.mall} />
              </button>
            </div>
          </div>
          <div className={styles.categoryBox}>
            <img src={Men} alt="categroyKids" />
            <div className={styles.categoryName}>
              <div>
                <span>Best Collection </span>
                <span>For Kids</span>
              </div>
              <button className={styles.shop} onClick={() => categoryHandler("Kids")}>
                SHOP NOW <LocalMallOutlinedIcon className={styles.mall} />
              </button>
            </div>
          </div>
          <div className={styles.categoryBox}>
            <img src={Women} alt="categroyWomen" />
            <div className={styles.categoryName}>
              <div>
                <span>Best Collection </span>
                <span>For Women</span>
              </div>
              <button className={styles.shop} onClick={() => categoryHandler("Women")}>
                SHOP NOW <LocalMallOutlinedIcon className={styles.mall} />
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* <div className={styles.categoryContainer}>
        {categories.length > 0 && (
          <ul>
            {categories.map(({ categoryName, _id }) => (
              <li key={_id} className={styles.catageoryItem} onClick={() => categoryHandler(categoryName)}>
                {categoryName}
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </>
  );
};

export default Categories;
