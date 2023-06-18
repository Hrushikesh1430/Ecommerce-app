export const InitialState = {
  cart: [],
};

export const cartReducer = (state, { type, payLoad }) => {
  switch (type) {
    case "ADD_ITEM":
      return { ...state, cart: [...state.cart, payLoad] };
    default:
      return state;
  }
};
