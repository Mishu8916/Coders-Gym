import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Home/logo.png";
import { FaDumbbell } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [isOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(15);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Optionally store tokens if you plan to use them after registration
  const [tokens, setTokens] = useState(null);
  const navigate = useNavigate();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Simple email and password validations
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = password.length >= 6;

  // API call to register the user and send OTP
  const handleEmailVerification = async () => {
    if (!isValidEmail || !isValidPassword) {
      alert("Please enter a valid email and a password with at least 6 characters.");
      return;
    }
    // Prepare the payload. Note: Adjust according to your API expectations.
    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/register-api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        // Registration successful, OTP sent
        setEmailVerified(true);
        setTokens({
          access: data.access,
          refresh: data.refresh,
        });
        alert("OTP sent to " + email);
      } else {
        // Display error message returned from API
        alert(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // Handle individual OTP input change and auto-focus on the next input
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value !== "" && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  // API call to verify the OTP
  const handleOtpVerification = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      alert("Please enter the complete 6-digit OTP.");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/register-api/verify-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: enteredOtp }),
      });
      const data = await response.json();
      if (response.ok) {
        setOtpVerified(true);
        alert("OTP verified successfully!");
      } else {
        alert(data.error || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      alert("An error occurred while verifying OTP. Please try again later.");
    }
  };

  // API call to resend OTP
  const handleResend = async () => {
    setTimer(30);
    setIsResendDisabled(true);
    setOtp(new Array(6).fill("")); // Clear OTP inputs
    try {
      const response = await fetch("http://127.0.0.1:8000/register-api/resend-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("New OTP sent to " + email);
      } else {
        alert(data.error || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error during resending OTP:", error);
      alert("An error occurred while resending OTP. Please try again later.");
    }
  };

  // Final registration step (optional if registration was completed in handleEmailVerification)
  const handleRegister = () => {
    if (!otpVerified) {
      alert("Please verify the OTP before registering.");
      return;
    }
    alert("Successfully Registered!");
    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const closeModal = () => navigate(-1);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="mt-10 relative bg-white dark:bg-dark p-8 rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-md overflow-y-auto max-h-[90vh]">
        <button onClick={closeModal} className="absolute top-2 right-2 text-2xl">
          &times;
        </button>
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="Logo" className="h-16" />
        </div>

        {/* Email Input and Verification */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="font-serif text-lg mb-2 flex items-center justify-center gap-2"
          >
            <FaDumbbell />
            <span className="font-bold">CODERS</span>
            <span className="text-primary font-bold">GYM</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full dark:text-black p-3 border rounded-lg focus:outline-none focus:ring-0 hover:border-primary"
          />
        </div>

        {/* OTP Section */}
        {emailVerified && (
          <div className="mb-6">
            <div className="flex justify-center gap-2 mb-4 relative">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type={isOtpVisible ? "text" : "password"}
                  maxLength="1"
                  className="w-12 h-12 text-center bg-gray-100 dark:bg-dark border border-gray-300 dark:border-gray-700 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
              <button
                onClick={() => setIsOtpVisible(!isOtpVisible)}
                className="absolute right-[-15px] top-3 text-black dark:text-white"
              >
                {isOtpVisible ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>
            {!otpVerified ? (
              <button
                onClick={handleOtpVerification}
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
              >
                Verify OTP
              </button>
            ) : (
              <p className="text-green-600 text-center mb-2">OTP Verified!</p>
            )}
            <div className="text-center mt-4">
              {timer > 0 ? (
                <p className="dark:text-white font-semibold">
                  OTP SENT 00:{timer < 10 ? `0${timer}` : timer}
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  className={`text-red-800 font-serif hover:underline ${isResendDisabled ? "cursor-not-allowed" : ""
                    }`}
                  disabled={isResendDisabled}
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        )}

        {/* Password Input */}
        <div className="mb-6 relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full dark:text-black p-3 border rounded-lg focus:outline-none focus:ring-0 hover:border-primary"
          />
          <span
            className="absolute right-3 top-1/3 transform -translate-y-1/2 flex items-center cursor-pointer dark:text-black"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
          </span>

          {!isValidPassword && password && (
            <p className="text-red-500 text-sm mt-1">
              Password must be at least 6 characters
            </p>
          )}
          {!isValidEmail && email && (
            <p className="text-red-500 text-sm mt-1">Enter a valid email</p>
          )}
          {!emailVerified ? (
            <p
              className="text-primary text-center font-serif text-sm mt-3 cursor-pointer hover:underline"
              onClick={handleEmailVerification}
            >
              Verify Email &amp; Send OTP
            </p>
          ) : (
            <p className="text-green-600 text-sm mt-2">OTP sent to your email</p>
          )}
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={!isValidEmail || !isValidPassword || !otpVerified}
          className={`w-full py-3 -mt-2 rounded-lg transition ${isValidEmail && isValidPassword && otpVerified
              ? "bg-blue-600 text-white hover:bg-blue-500"
              : "bg-gray-400 text-white cursor-not-allowed"
            }`}
        >
          Register
        </button>

        <p
          className="text-blue-500 text-sm font-serif text-center mt-4 cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Already a user?
        </p>

        <p className="text-xs text-center text-gray-600 mt-6">
          By continuing you agree to the{" "}
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

export default Register;
