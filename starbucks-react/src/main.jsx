import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // framework
import "./styles.css"; // your Starbucks look
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter  basename="/webdevhw3">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
