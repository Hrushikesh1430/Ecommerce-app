import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";

// Call make Server
makeServer();

const container = document.getElementById("root");

const Main = () => (
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);

const root = createRoot(container);
root.render(<Main />);
