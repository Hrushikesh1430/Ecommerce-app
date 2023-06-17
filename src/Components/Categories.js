import { useEffect, useState } from "react";
import styles from "./categories.module.css";
const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data.categories);
    } catch (e) {}
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <div className={styles.categoryContainer}>
        {categories.length > 0 && (
          <ul>
            {categories.map(({ categoryName, _id }) => (
              <li key={_id}>{categoryName}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Categories;
