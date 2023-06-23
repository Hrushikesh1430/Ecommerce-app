import { createContext, useContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "..";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const { userToken } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [totalCartAmount, settotalCartAmount] = useState(0);

  useEffect(() => {
    settotalCartAmount(() =>
      cart.reduce((acc, { price, qty }) => {
        return acc + Number(price) * qty;
      }, 0)
    );
  }, [cart]);

  const getCartItemsAPI = async (token = userToken) => {
    const url = "/api/user/cart";
    const config = {
      method: "GET",
      headers: {
        authorization: token,
      },
    };
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      setCart(data.cart);
    } catch (e) {}
  };

  const addCartAPI = async (product) => {
    const url = "/api/user/cart";
    const config = {
      method: "POST",
      headers: {
        authorization: userToken,
      },
      body: JSON.stringify({ product: product }),
    };
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      setCart(data.cart);
    } catch (e) {}
  };

  const deleteCartAPI = async (productId) => {
    const url = `/api/user/cart/${productId}`;
    const config = {
      method: "DELETE",
      headers: {
        authorization: userToken,
      },
    };
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      console.log(data);
      setCart(data.cart);
    } catch (e) {}
  };

  const cartQuantityAPI = async (productId, action) => {
    const APIbody = {
      action: {
        type: action,
      },
    };
    const url = `/api/user/cart/${productId}`;
    const config = {
      method: "POST",
      headers: {
        authorization: userToken,
      },
      body: JSON.stringify(APIbody),
    };
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      console.log(data);
      setCart(data.cart);
    } catch (e) {}
  };

  const addCartHandler = (product) => {
    userToken ? addCartAPI(product) : navigate("/login");
  };

  const deleteCartHandler = (productId) => {
    deleteCartAPI(productId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addCartHandler,
        totalCartAmount,
        settotalCartAmount,
        getCartItemsAPI,
        deleteCartHandler,
        cartQuantityAPI,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
