import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { AuthContext, DataContext, WishListContext } from "..";

import Categories from "../Components/Categories";
import Navbar from "../Components/Navbar";

export const Home = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(DataContext);
  const getProductsAPI = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      dispatch({ type: "INITIAL_FETCH", payLoad: data.products });
    } catch (e) {}
  };

  useEffect(() => {
    getProductsAPI();
  }, []);

  return (
    <>
      <Navbar />
      <Categories />
    </>
  );
};
