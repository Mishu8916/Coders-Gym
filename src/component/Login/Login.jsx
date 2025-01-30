import React, { useState, useEffect } from "react";
import Logo from '../../assets/Home/logo.png';
import { FaDumbbell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isOpen] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const closeModal = () => navigate(-1);

  const isValidPhone = phoneNumber.match(/^\d{10}$/);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-dark p-8 rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-md overflow-y-auto max-h-[90vh]">
        <button onClick={closeModal} className="absolute top-2 right-2 text-2xl">
          &times;
        </button>

        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="not found" className="h-16" />
        </div>

        <div className="mb-6">
          <label htmlFor="phone" className="font-serif text-lg mb-2 flex items-center justify-center gap-2">
            <FaDumbbell />
            <span className="font-bold">CODERS</span>
            <span className="text-primary font-bold">GYM</span>
          </label>

          <div className="flex items-center border rounded-lg overflow-hidden">
            <span className="px-3 bg-white dark:bg-dark dark:text-white ">+91</span>
            <input
              type="text"
              id="phone"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 p-3 bg-white dark:bg-dark focus:outline-none focus:ring-0 border-2 hover:border-primary"
            />
          </div>
          {!isValidPhone && phoneNumber && (
            <p className="text-red-500 text-sm mt-1">Enter a valid 10-digit number</p>
          )}
        </div>

        <button
          onClick={() => navigate("/otp")}
          disabled={!isValidPhone}
          className={`w-full py-3 rounded-lg transition ${
            isValidPhone ? "bg-blue-600 text-white hover:bg-blue-500" : "w-full py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-500 transition cursor-not-allowed"
          }`}
        >
          Continue
        </button>

        <div className="flex justify-center gap-6 mt-4">
          <div onClick={() => navigate("/Login1")} className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer">
            <p className="font-serif">or connect with</p>
            <button className="bg-dark hover:bg-primary p-3 rounded-full">
              <img src="https://img.icons8.com/ios-filled/24/ffffff/google-logo.png" alt="Google" className="h-6 w-6" />
            </button>
          </div>
        </div>

        <p className="text-xs text-center text-gray-600 mt-6">
          By continuing you agree to the{" "}
          <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and{" "}
          <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
