import { useContext } from "react";
import { CartContext } from "..";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);
};

export default Cart;
