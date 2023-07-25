import { createContext, useContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "..";

import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const { userToken } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [cartButtonDisabled, setCartButtonDisabled] = useState(false);
  const [cartButtonId, setCartButtonId] = useState(0);
  const [quantityDisabled, setQuantityDisabled] = useState(false);
  const [quantityId, setQuantityId] = useState(0);
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
    } catch (e) {
    } finally {
    }
  };

  const addCartAPI = async (product) => {
    setCartButtonId(product._id);
    setCartButtonDisabled(true);
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
      toast.success(`Added to Cart`, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (e) {
    } finally {
      setCartButtonDisabled(false);
    }
  };

  const deleteCartAPI = async (productId) => {
    setCartButtonId(productId);
    setCartButtonDisabled(true);
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
      toast.warning(`Removed from Cart`, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (e) {
    } finally {
      setCartButtonDisabled(false);
    }
  };

  const cartQuantityAPI = async (productId, action) => {
    setQuantityId(productId);
    setQuantityDisabled(true);
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
    } catch (e) {
    } finally {
      setQuantityDisabled(false);
      setQuantityId(0);
    }
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
        cartButtonDisabled,
        getCartItemsAPI,
        deleteCartHandler,
        cartQuantityAPI,
        cartButtonId,
        quantityDisabled,
        quantityId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
