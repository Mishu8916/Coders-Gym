import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Home/logo.png";
import { FaDumbbell } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  // States for modal open, email, password, OTP, and UI flags
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Email validation
  const validateEmail = (email) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
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

  // Step 1: Send OTP by calling the send-otp API endpoint
  const handleContinue = async () => {
    // If OTP has not yet been sent, send the OTP
    if (!otpSent) {
      if (!email.trim() || !password.trim() || emailError) {
        setMessage("Please provide valid email and password.");
        return;
      }
      setMessage("");
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/login-api/send-otp1/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.ok) {
          setOtpSent(true);
          setMessage("OTP sent to your email.");
        } else {
          setMessage(data.error || "Failed to send OTP.");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again later.");
      }
      setLoading(false);
    } else {
      // Optionally, use the same function for "Resend OTP"
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/login-api/send-otp1/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.ok) {
          setMessage("OTP resent to your email.");
          setOtp(new Array(6).fill("")); // Clear OTP fields
        } else {
          setMessage(data.error || "Failed to resend OTP.");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again later.");
      }
      setLoading(false);
    }
  };

  // Handle OTP input change and auto-focus to next input field
  const handleOtpChange = (e, index) => {
    if (isNaN(e.target.value)) return;
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  // Step 2: Verify OTP by calling the verify-otp API endpoint
  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setMessage("Please enter the complete 6-digit OTP.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/login-api/verify-otp2/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, otp: enteredOtp }),
      });
      const data = await response.json();
      if (response.ok) {
        setOtpVerified(true);
        setMessage("Login successful!");
        login(); // Set authentication state to true
        // Redirect to dashboard or home page
        setTimeout(() => {
          navigate("/landing");
        }, 1500);
      } else {
        setMessage(data.error || "OTP verification failed.");
      }
    } catch (error) {
      setMessage("An error occurred during OTP verification.");
    }
    setLoading(false);
  };

  // Forgot password handler (placeholder)
  const handleForgotPassword = () => {
    if (validateEmail(email)) {
      setMessage("Password reset link has been sent to your email.");
      // Optionally, add API integration for password reset
    } else {
      setMessage("Please enter a valid email to receive the reset link.");
    }
  };

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
          <img src={Logo} alt="Logo" className="h-16" />
        </div>

        {/* Email Input */}
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
            <p className="font-serif text-red-500 text-sm mt-1 text-center">
              {emailError}
            </p>
          )}
        </div>

        {/* Show password & forgot password only when OTP has not been sent */}
        {!otpSent && (
          <>
            <div className="mb-4">
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

            <div className="mb-4">
              <button
                onClick={handleContinue}
                disabled={loading || !email.trim() || !password.trim() || emailError}
                className={`w-full py-3 rounded-lg transition ${
                  email.trim() && password.trim() && !emailError
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "bg-blue-600 text-white font-serif text-lg rounded-lg cursor-not-allowed"
                }`}
              >
                {loading ? "Sending OTP..." : "Continue"}
              </button>
            </div>
          </>
        )}

        {/* OTP Input Section */}
        {otpSent && !otpVerified && (
          <div className="mb-4">
            <p className="text-center text-sm mb-2">
              Enter the 6-digit OTP sent to your email:
            </p>
            <div className="flex justify-center gap-2 mb-4">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 text-center bg-gray-100 dark:bg-dark border border-gray-300 dark:border-gray-700 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={data}
                  onChange={(e) => handleOtpChange(e, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>
            <div className="mb-4">
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className={`w-full py-3 rounded-lg transition ${
                  otp.join("").length === 6
                    ? "bg-green-600 text-white hover:bg-green-500"
                    : "bg-green-600 text-white font-serif text-lg rounded-lg cursor-not-allowed"
                }`}
              >
                {loading ? "Verifying OTP..." : "Verify OTP"}
              </button>
            </div>
            <div className="mb-4 text-center">
              <button
                onClick={handleContinue}
                disabled={loading}
                className="text-red-800 font-serif hover:underline"
              >
                Resend OTP
              </button>
            </div>
          </div>
        )}

        {message && (
          <p className="text-center text-sm mt-2 text-green-500">{message}</p>
        )}

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

export default Login;