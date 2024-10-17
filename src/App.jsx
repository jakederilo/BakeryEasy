// App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "./components/Navbar/About";
import Hero from "./components/Layout/Hero";
import HomeMenu from "./components/Layout/HomeMenu";
import Contact from "./components/Navbar/Contact";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./components/Pages/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/Landing" element={<Landing />}></Route>
          <Route path="/hero" element={<Hero />}></Route>
          <Route path="/menu" element={<HomeMenu />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
