import { createContext, useEffect, useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

import { toast } from "react-toastify";

export const WishListContext = createContext();

export const WishListContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const { userToken } = useContext(AuthContext);

  const [wishList, setWishList] = useState([]);
  const [wishButtonDisabled, setWishButtonDisabled] = useState(false);
  const [wishButtonId, setWishButtonId] = useState(0);

  const addWishListAPI = async (product) => {
    setWishButtonId(product._id);
    setWishButtonDisabled(true);
    const url = "/api/user/wishlist";
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
      setWishList(data.wishlist);
      toast.success(`Added to Wishlist`, {
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
      setWishButtonDisabled(false);
    }
  };
  const deleteWishListAPI = async (productId) => {
    setWishButtonId(productId);
    setWishButtonDisabled(true);
    const url = `/api/user/wishlist/${productId}`;
    const config = {
      method: "DELETE",
      headers: {
        authorization: userToken,
      },
    };
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      setWishList(data.wishlist);
      toast.warning(`Removed from Wishlist`, {
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
      setWishButtonDisabled(false);
    }
  };

  const addToWishList = (product) => {
    userToken ? addWishListAPI(product) : navigate("/login");
  };

  const getWishListAPI = async (token = userToken) => {
    const url = "/api/user/wishlist";
    const config = {
      method: "GET",
      headers: {
        authorization: token,
      },
    };
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      console.log(data);
      setWishList(data.wishlist);
    } catch (e) {}
  };
  const deleteWishList = (productId) => {
    deleteWishListAPI(productId);
  };

  return (
    <WishListContext.Provider
      value={{
        wishList,
        setWishList,
        addToWishList,
        addWishListAPI,
        getWishListAPI,
        deleteWishList,
        wishButtonDisabled,
        wishButtonId,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};
