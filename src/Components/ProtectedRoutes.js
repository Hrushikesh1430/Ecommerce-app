import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ component, redirect }) => {
  if (!localStorage.getItem("loggedUser")) {
    return <Navigate to={`/${redirect}`} replace />;
  }
  return component;
};
