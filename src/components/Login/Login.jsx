import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import Back from "../../assets/Leftarrow.svg";

const Login = ({ onLoginSuccess, onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    axios
      .post("http://localhost:5000/Login", { email, password, captchaToken })
      .then((result) => {
        if (result.data.token) {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("name", result.data.user.name);
          localStorage.setItem("id", result.data.user._id);
          localStorage.setItem("image", result.data.user.image);

          onLoginSuccess(result.data.user);
          navigate("/dashboard");
        } else {
          setErrorMessage("Invalid credentials");
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Something went wrong. Please try again later.");
      });
  };

  const handleChange = (setter) => (e) => setter(e.target.value);

  const handleClose = () => {
    onClose();
    if (isMobile) {
      // If it's mobile, navigate to the hero page when closing the login modal
      navigate("/hero");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
      onClick={(e) => {
        if (isMobile && e.target === e.currentTarget) {
          handleClose(); // Close and navigate if it's mobile
        }
      }}
    >
      <button
        onClick={handleClose} // Use handleClose to also handle the mobile redirection
        className="absolute  top-10 right-2 bo text-gray-600 text-5xl w-16 h-16 hover:text-gray-800 flex items-center justify-center"
      >
        &times;
      </button>

      <div
        className={`bg-white ${isMobile ? "w-full h-full" : "w-full max-w-md"} p-6 ${isMobile ? "rounded-none" : "rounded-xl"} shadow-lg relative transition-all duration-300`}
      >
        <section className="font-Roboto mt-4">
          {isMobile && (
            <button
              onClick={handleClose} // Use handleClose to also handle the mobile redirection
              className="absolute -inset-0 right-0 text-gray-600 text-5xl w-16 h-16 hover:text-gray-800 flex items-center justify-center"
            >
              <img src={Back} alt="Back" width={24} height={24} />
            </button>
          )}
          <p className="text-center text-xl mr-13 ml-2 text-gray-500 mb-2">
            Welcome back!
            <br /> Log in <span className="text-primary">Now</span> to craft the
            cake of your dreams!
          </p>

          <h1 className="text-center mt-5 text-black font-semibold text-4xl mb-4">
            Login
          </h1>
          {errorMessage && (
            <p className="text-center mb-4 text-red-500">{errorMessage}</p>
          )}

          <form className="max-w-xs mx-auto" onSubmit={handleSubmit}>
            <ReCAPTCHA
              sitekey="6LeQLI4qAAAAAApAQAdKaG7O2c2hXXtrLseb8jTG"
              onChange={handleCaptchaChange}
              className="justify-center items-center pb-4 pl-2"
            />

            <button
              disabled={!captchaToken}
              className="flex gap-4 justify-center w-full text-gray-700 font-semibold border border-gray-500 rounded-xl px-6 py-2"
              onClick={(e) => {
                window.location.href = "http://localhost:5000/auth/google";
              }}
            >
              <img
                src={"/google.png"}
                alt="Google icon"
                width={24}
                height={24}
              />
              Login
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
