"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleClick = () => {
    navigate("/RegisterForm");
  };

  /** AQUI PASSAREMOS OS DADOS RECEBIDOS NO CLIENT PARA O BACKEND */
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/Hero"); /** Aqui volta para Home */
        }
      })
      .catch((err) => console.log(err));
  };
  // Como chamamos a rota register axios.post("http://localhost:3005/register"
  // Então vamos ter que criar esta rota /register   no arquivo index.js

  return (
    <div>
      <section className="font-Roboto mt-8">
        <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
        <form className="max-w-xs mx-auto" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="font-Roboto bg-primary text-white justify-center w-full  rounded-xl px-6 py-2"
            type="submit"
          >
            Login
          </button>
          <button
            className="btn btn-default border w-100 bg-light rounded-0 
                   text-decoration-none"
            onClick={handleClick}
          >
            Sign Up
          </button>
          <button className="flex gap-4 justify-center w-full text-gray-700 font-semibold border border-gray-500 rounded-xl px-6 py-2">
            <img src={"/google.png"} alt={""} width={24} height={24} />
            Login with google
          </button>
        </form>
      </section>
    </div>
  );
};

export default LoginForm;
