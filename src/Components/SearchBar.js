import { useContext, useState } from "react";
import { DataContext } from "../Context/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export const SearchBar = () => {
  const { state, dispatch } = useContext(DataContext);
  const [searchBoxVisible, setSearcbBoxVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (value) => {
    const searchValue = value.trim().toLowerCase();
    searchValue.length > 0 ? setSearcbBoxVisible(true) : setSearcbBoxVisible(false);
    dispatch({ type: "SEARCH_FILTER", payLoad: searchValue });
  };

  console.log(state.searchList);
  return (
    <>
      <div className="searchWrapper">
        <div className="searchInputWrapper">
          <div className="searchInput">
            <label>Search</label>
            <input
              type="text"
              onChange={(e) => {
                setSearchInput(e.target.value);
                handleSearchChange(e.target.value);
              }}
              value={searchInput}
            />
            {searchBoxVisible && (
              <FontAwesomeIcon
                icon={faClose}
                className="closeSearch"
                onClick={() => {
                  setSearcbBoxVisible(false);
                  setSearchInput("");
                }}
              />
            )}
          </div>
          {searchBoxVisible && (
            <div className="SearchBox">
              {state.searchList.length > 0 ? (
                state.searchList.map((item) => (
                  <div className="searchItem">
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
