export const InitialState = {
  wishList: [],
};

export const WishListReducer = (state, { type, payLoad }) => {
  switch (type) {
    case "ADD_ITEM":
      return { ...state, wishList: [...state.wishList, payLoad] };
    case "DELETE_ITEM":
      return {
        ...state,
        wishList: state.wishList.filter(({ id }) => id !== payLoad.id),
      };
    default:
      return state;
  }
};
