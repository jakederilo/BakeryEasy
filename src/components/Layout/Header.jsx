import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "../Login/Login";
import Register from "../Login/Register";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkLoginStatus(token);
    } else {
      // Check if we have a token in the URL (for Google login)
      const queryParams = new URLSearchParams(window.location.search);
      const googleToken = queryParams.get("token");

      if (googleToken) {
        // Save the token to localStorage
        localStorage.setItem("token", googleToken);
        checkLoginStatus(googleToken); // Check the login status
        // Optionally, remove the token from the URL after storing it
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }
    }
  }, []);

  const checkLoginStatus = async (token) => {
    try {
      const response = await axios.get("http://localhost:5173/protected", {
        headers: {
          Authorization: token,
        },
      });
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Not logged in or token is invalid", error);
      setIsAuthenticated(false);
    }
  };

  // Function to toggle the register modal
  const handleRegisterClick = () => {
    setShowRegister(true); // Show the modal when Register button is clicked
  };

  // Function to close the register modal
  const handleCloseRegister = () => {
    setShowRegister(false); // Hide the modal when the close button is clicked
  };

  const handleCloseLogin = () => {
    setShowLogin(false); // Hide the modal when the close button is clicked
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  const toggleLogin = () => {
    setShowLogin((prev) => !prev); // Toggle login visibility
  };

  return (
    <header className="sticky top-0 z-10 h-24 bg-white sans-serif">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-0"
      >
        <div className="flex text-3xl items-center text-primary font-Roboto font-semibold lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            BAKERY EASY
          </a>
        </div>
        <div className="hidden font-Roboto lg:flex lg:gap-x-12">
          <Link
            to="/hero"
            className="text-m text-black font-semibold leading-6"
          >
            Home
          </Link>
          <Link
            to="/menu"
            className="text-m text-black font-semibold leading-6"
          >
            Menu
          </Link>
          <Link
            to="/about"
            className="text-m text-black font-semibold leading-6"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-m text-black font-semibold leading-6 mr-10"
          >
            Contact
          </Link>
        </div>

        {isAuthenticated ? (
          <div className=" flex items-center">
            <span className="mr-10 text-lg font-semibold">
              Hello, {user?.name || "User"}
            </span>
            <button
              onClick={handleLogout}
              className="bg-primary text-white font-extrabold px-8 py-2 rounded-full"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <button className="mr-4" onClick={toggleLogin}>
              <span className="text-lg font-extrabold text-black">Login</span>
            </button>
            <button
              onClick={handleRegisterClick}
              className="bg-primary text-white font-extrabold px-8 py-2 rounded-full"
            >
              Register
            </button>
          </div>
        )}
      </nav>

      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <Login
              onLoginSuccess={() => {
                setIsAuthenticated(true); // Update authentication state
                setShowLogin(false); // Close modal on successful login
              }}
              onClose={handleCloseLogin}
            />
          </div>
        </div>
      )}
      {showRegister && (
        <Register onClose={handleCloseRegister} /> // Pass onClose prop to handle closing the modal
      )}
    </header>
  );
}
