import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "..";
import Categories from "../Components/Categories";
import Navbar from "../Components/Navbar";

export const Home = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Categories />
    </>
  );
};
