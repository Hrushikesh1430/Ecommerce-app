import { createContext, useReducer } from "react";

import { InitialState, cartReducer } from "../Reducers/CartReducer";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, InitialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
