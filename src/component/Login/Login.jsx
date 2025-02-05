import React, { useState, useEffect } from "react";
import Logo from "../../assets/Home/logo.png";
import { FaDumbbell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const validateEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleForgotPassword = () => {
    if (validateEmail(email)) {
      setResetMessage("Password reset link has been sent to your email.");
    } else {
      setResetMessage("Please enter a valid email to receive the reset link.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-dark p-8 rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-md overflow-y-auto max-h-[90vh]">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-2 left-2 flex items-center gap-2 text-lg bg-white dark:bg-dark dark:text-white px-3 py-2 rounded-lg"
        >
          <IoArrowBack />
        </button>

        <button
          onClick={() => navigate("/")}
          className="absolute top-2 right-2 bg-white dark:bg-dark dark:text-white text-2xl"
        >
          &times;
        </button>

        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="not found" className="h-16" />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="font-serif bg-white dark:bg-dark dark:text-white text-lg mb-2 text-center flex items-center justify-center gap-2"
          >
            <FaDumbbell />
            <span className="font-bold">CODERS</span>
            <span className="text-primary font-bold">GYM</span>
          </label>

          <div className="flex items-center border hover:border-primary focus:border-primary rounded-lg bg-white dark:bg-dark dark:text-white overflow-hidden">
            <input
              type="text"
              id="email"
              placeholder="Email Id"
              className="flex-1 p-3 bg-white dark:bg-dark focus:outline-none focus:ring-0"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          {emailError && (
            <p className="font-serif text-red-500 text-sm mt-1 text-center">{emailError}</p>
          )}
        </div>

        <div className="mb-2">
          <div className="flex items-center border hover:border-primary focus:border-primary rounded-lg bg-white dark:bg-dark dark:text-white overflow-hidden">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="flex-1 p-3 bg-white dark:bg-dark focus:outline-none focus:ring-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-3 dark:text-white"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </div>

        <div className="mb-4 text-center">
          <button
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:underline focus:outline-none"
          >
            Forgot Password?
          </button>
        </div>

        {resetMessage && (
          <p className="text-green-500 text-sm text-center mb-4">{resetMessage}</p>
        )}

        <div>
          <button
            onClick={() => navigate("/otp")}
            disabled={!email.trim() || !password.trim() || emailError}
            className={`w-full py-3 rounded-lg transition ${email.trim() && password.trim() && !emailError ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-blue-600 text-white font-serif text-lg rounded-lg cursor-not-allowed"}`}
          >
            Continue
          </button>
        </div>

        <p className="text-xs text-center text-gray-600 mt-6">
          By Continuing you agree to the{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
