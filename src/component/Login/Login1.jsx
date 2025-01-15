import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo.png";
import { FaDumbbell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5"; // Import back arrow icon

const Login1 = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  // Add or remove body scroll when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable background scroll
    } else {
      document.body.style.overflow = "auto"; // Enable background scroll
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-dark p-8 rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-md overflow-y-auto max-h-[90vh]">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-2 left-2 flex items-center gap-2 text-lg bg-white dark:bg-dark dark:text-white px-3 py-2 rounded-lg"
        >
          <IoArrowBack />
        </button>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 bg-white dark:bg-dark dark:text-white text-2xl"
        >
          &times;
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="not found" className="h-16" />
        </div>

        {/* Phone Input */}
        <div className="mb-6">
          <label
            htmlFor="phone"
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
            />
          </div>
        </div>

        {/* Continue Button */}
        <div onClick={() => navigate("/otp")}>
        <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
          Continue
        </button>
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2 border hover:border-primary p-3 rounded-lg bg-light dark:bg-dark">
            <p className="dark:text-white font-serif">or connect with</p>
            <button className="bg-dark hover:bg-primary p-3 rounded-full">
              <img
                src="https://img.icons8.com/ios-filled/24/ffffff/google-logo.png"
                alt="Google"
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-center text-gray-600 mt-6">
          By Continuing you agree to the{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Login1;
