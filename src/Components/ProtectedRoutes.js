import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "..";

export const ProtectedRoutes = ({ component, redirect }) => {
  if (!localStorage.getItem("loggedUser")) {
    return <Navigate to={`/${redirect}`} replace />;
  }
  return component;
};
