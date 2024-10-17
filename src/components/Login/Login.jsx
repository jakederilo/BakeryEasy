import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLoginSuccess, onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Email and Password are required.");
      return;
    }

    axios
      .post("http://localhost:5000/login", { email, password })
      .then((result) => {
        if (result.data.token) {
          localStorage.setItem("token", result.data.token);
          onLoginSuccess();
          navigate("/hero");
        } else {
          setErrorMessage("Invalid credentials");
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Invalid credentials");
      });
  };

  const handleChange = (setter) => (e) => setter(e.target.value);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
        {/* Close button */}
        <button
          onClick={onClose} // Close modal on clicking ×
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>

        <section className="font-Roboto mt-4">
          <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
          {errorMessage && (
            <p className="text-center mb-4 text-red-500">{errorMessage}</p>
          )}

          <form className="max-w-xs mx-auto" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange(setEmail)}
              className="mb-4 w-full border rounded-lg p-2"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange(setPassword)}
              className="mb-4 w-full border rounded-lg p-2"
              required
            />
            <button
              className="font-Roboto bg-primary text-white justify-center w-full rounded-xl px-6 py-2"
              type="submit"
            >
              Login
            </button>
            <div className="my-4 text-center text-gray-500">
              or login with provider
            </div>
            <button
              className="flex gap-4 justify-center w-full text-gray-700 font-semibold border border-gray-500 rounded-xl px-6 py-2"
              onClick={() =>
                (window.location.href = "http://localhost:5000/auth/google")
              }
            >
              <img
                src={"/google.png"}
                alt="Google icon"
                width={24}
                height={24}
              />
              Login with Google
            </button>
            <div className="my-4 text-center text-gray-500 cursor-pointer">
              Sign Up
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
