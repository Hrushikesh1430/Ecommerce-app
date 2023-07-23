export const InitialState = {
  intialProductList: [],
  filteredProducts: [],
  searchList: [],
  categoryCheck: [],
  sizeCheck: [],
  rating: "",
  sortOrder: "",
  price: "2000",
};

export const FilterReducer = (state, { type, payLoad }) => {
  switch (type) {
    case "INITIAL_FETCH":
      return {
        ...state,
        filteredProducts: payLoad,
        intialProductList: payLoad,
      };
    case "FILTER_BY_CATEGORY":
      return {
        ...state,
        categoryCheck:
          state.categoryCheck.includes(payLoad.value) && payLoad.checked === false
            ? state.categoryCheck.filter((item) => item !== payLoad.value)
            : [...state.categoryCheck, payLoad.value],
      };
    case "FILTER_BY_SIZE":
      return {
        ...state,
        sizeCheck: state.sizeCheck.includes(payLoad.value)
          ? state.sizeCheck.filter((item) => item !== payLoad.value)
          : [...state.sizeCheck, payLoad.value],
      };
    case "FILTER_BY_RATING":
      return {
        ...state,
        rating: payLoad,
      };
    case "SORT_PRODUCTS":
      return {
        ...state,
        sortOrder: payLoad,
      };
    case "PRICE_SLIDER":
      return {
        ...state,
        price: payLoad,
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        categoryCheck: [],
        sizeCheck: [],
        rating: "",
        sortOrder: "",
        price: "2000",
      };
    case "SEARCH_FILTER":
      return {
        ...state,
        searchList:
          payLoad.length === 0
            ? []
            : state.intialProductList
                .filter(({ brand, name }) => brand.toLowerCase().includes(payLoad) || name.toLowerCase().includes(payLoad))
                .slice(0, 7),
      };
    case "SET_FILTERED_PRODUCTS":
      return { ...state, filteredProducts: payLoad };
    default:
      return state;
  }
};
