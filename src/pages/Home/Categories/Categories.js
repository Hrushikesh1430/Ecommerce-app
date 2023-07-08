import { useContext, useEffect, useState } from "react";
import styles from "./categories.module.css";
import { DataContext, DataContextProvider } from "../../..";
import { useNavigate } from "react-router";
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
    dispatch({
      type: "FILTER_BY_CATEGORY",
      payLoad: {
        checked: true,
        value: category,
      },
    });

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
            <p>Men</p>
          </div>
          <div className={styles.categoryBox}>
            <p>WomenMen</p>
          </div>
          <div className={styles.categoryBox}>
            <p>Kids</p>
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
