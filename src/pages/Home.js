import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { AuthContext, DataContext, WishListContext } from "..";

import Categories from "../Components/Categories";
import Navbar from "../Components/Navbar/Navbar";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      {/* <Categories /> */}
    </>
  );
};
