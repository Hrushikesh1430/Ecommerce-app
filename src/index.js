import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";

import { makeServer } from "./server";

import { AuthContextProvider, AuthContext } from "./Context/AuthContext";
import { CartContext, CartContextProvider } from "./Context/CartContext";
import {
  WishListContext,
  WishListContextProvider,
} from "./Context/WishListContext";

export { AuthContext, CartContext, WishListContext };

// Call make Server
makeServer();

const container = document.getElementById("root");

const Main = () => (
  <Router>
    <React.StrictMode>
      <AuthContextProvider>
        <WishListContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </WishListContextProvider>
      </AuthContextProvider>
    </React.StrictMode>
  </Router>
);

const root = createRoot(container);
root.render(<Main />);
