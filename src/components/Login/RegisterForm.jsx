import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleClick = () => {
    navigate("/login");
  };

  /** AQUI PASSAREMOS OS DADOS RECEBIDOS NO CLIENT PARA O BACKEND */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Usaremos o axios para enviar os dados
    // Daqui vai para a rota, e depois vai inserir as informações no Banco de Dados
    //{name, email, password}  = {name: name, email: email, password: password}
    axios
      .post("http://localhost:5000/register", { name, email, password })
      .then((result) => {
        console.log(result);
        navigate("/LoginForm");
      })
      .catch((err) => console.log(err)); // Corrected line
  };
  // Como chamamos a rota register axios.post("http://localhost:3005/register"
  // Então vamos ter que criar esta rota /register   no arquivo index.js

  return (
    <section className="font-Roboto mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleSubmit}>
        <input
          type="name"
          placeholder="name"
          autoComplete="off"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          autoComplete="off"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          autoComplete="off"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="font-Roboto bg-primary text-white justify-center w-full  rounded-xl px-6 py-2"
          type="submit"
        >
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button className="flex gap-4 justify-center w-full text-gray-700 font-semibold border border-gray-500 rounded-xl px-6 py-2">
          <img src={"/google.png"} alt={""} width={24} height={24} />
          Login with google
        </button>
        <button
          className="text-center my-4 text-gray-500 border-t pt-4"
          onClick={handleClick}
        >
          Existing account?{" "}
          <Link to="RegisterForm" className="underline">
            Login here &raquo;
          </Link>
        </button>
      </form>
    </section>
  );
};

export default RegisterForm;
