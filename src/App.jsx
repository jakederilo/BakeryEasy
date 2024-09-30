// App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/Login/RegisterForm";
import About from "./components/Navbar/About";
import Hero from "./components/Layout/Hero";
import HomeMenu from "./components/Layout/HomeMenu";
import Contact from "./components/Navbar/Contact";
import LoginForm from "./components/Login/LoginForm";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route index element={<Hero />}></Route>
          <Route path="/Hero" element={<Hero />}></Route>
          <Route path="/Menu" element={<HomeMenu />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
          <Route path="/RegisterForm" element={<RegistrationForm />}></Route>
          <Route path="/LoginForm" element={<LoginForm />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
