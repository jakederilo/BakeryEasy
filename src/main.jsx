import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Header from "./components/Layout/Header.jsx";
import { BrowserRouter } from "react-router-dom";
import Hero from "./components/Layout/Hero.jsx";
import HomeMenu from "./components/Layout/HomeMenu.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <div className="max-w-6xl mx-auto">
      <Header />
      <App />
    </div>
  </BrowserRouter>
);
