import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { AuthContext, DataContext, WishListContext } from "../../index";

import Navbar from "../../Components/Navbar/Navbar";
import Hero from "./Hero/Hero";
import Categories from "./Categories/Categories";
import Features from "./Features/Features";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <Features />
      {/* <Categories /> */}
    </>
  );
};
