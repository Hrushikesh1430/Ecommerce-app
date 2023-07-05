import { useContext, useState } from "react";
import { DataContext } from "../../Context/DataContext";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  const { state, dispatch } = useContext(DataContext);
  const [searchBoxVisible, setSearcbBoxVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (value) => {
    const searchValue = value.trim().toLowerCase();
    searchValue.length > 0 ? setSearcbBoxVisible(true) : setSearcbBoxVisible(false);
    dispatch({ type: "SEARCH_FILTER", payLoad: searchValue });
  };

  return (
    <>
      <div className={styles.searchWrapper}>
        <div className={styles.searchInputWrapper}>
          <input
            placeholder="Search"
            type="text"
            onChange={(e) => {
              setSearchInput(e.target.value);
              handleSearchChange(e.target.value);
            }}
            value={searchInput}
            className={styles.searchInput}
          />
          <SearchOutlinedIcon
            className={styles.closeSearch}
            onClick={() => {
              setSearcbBoxVisible(false);
              setSearchInput("");
            }}
          />

          {searchBoxVisible && (
            <div className={styles.SearchBox}>
              {state.searchList.length > 0 ? (
                state.searchList.map((item) => (
                  <div className={styles.searchItem}>
                    <p>{item.brand}</p>
                    <p>{item.name}</p>
                  </div>
                ))
              ) : (
                <p>No items found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
