import React, { useState, useEffect } from "react";
import Logo from "../../assets/Home/logo.png";
import { FaDumbbell } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({email: "",password: "", });
  const [otp, setOtp] = useState(new Array(6).fill(""));
  // const [setIsOtpSent,setIsOtpSent]=useState(false);
  const [errors,setErrors] =useState({});
  // const[loading,setloading]=useState(false);

  const [isOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [timer, setTimer] = useState(15);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);


      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/register/",
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        alert(response.data.message);
        setIsOtpSent(true); // Proceed to OTP step
      } catch (error) {
        console.error("Error Response:", error);
        handleApiErrors(error);
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/verify-otp/",
        { email: formData.email, otp }
      );

      alert(response.data.message);
      navigate("/Register"); // Redirect to profile
    } catch (error) {
      handleApiErrors(error);
    }
  };

  const handleApiErrors = (error) => {
    if (error.response ) {
      console.error("Error Data:", error.response.data);
      alert(error.response.data.message || "An error occurred.");
    } else if (error.request) {
      console.error("No Response Received:", error.request);
      alert("No response received from the server.");
    } else {
      console.error("Error Message:", error.message);
      alert("An unexpected error occurred.");
    }
  };


 // Close modal
  const closeModal = () => navigate(-1);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = password.length >= 6;

  // Handle email verification (send OTP)
  const handleEmailVerification = async () => {
    if (!isValidEmail) {
      alert("Please enter a valid email to send OTP.");
      return;
    }
    setLoading(true);
    await sendOTP(email, password);
    setLoading(false);
  };

  // Handle OTP input changes
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value !== "" && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  // Handle OTP verification
  const handleOtpVerification = async () => {
    setLoading(true);
    await verifyOTP(email, otp.join(""));
    setLoading(false);
  };

  // Handle OTP resend
  const handleResend = async () => {
    setLoading(true);
    await resendOTP(email);
    setLoading(false);
  };

  // Handle final registration
  const handleRegister = () => {
    if (!otpVerified) {
      alert("Please verify the OTP before registering.");
      return;
    }
    alert("Successfully Registered!");
    setTimeout(() => {
      navigate("/login1");
    }, 1500);
  };

  if (!isOpen) return null;

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
          {!isValidEmail && email && (
            <p className="text-red-500 text-sm mt-1">Enter a valid email</p>
          )}
          {!emailVerified ? (
            <p
              className="text-primary text-center text-sm mt-2 cursor-pointer hover:underline"
              onClick={handleEmailVerification}
            >
              Verify Email & Send OTP
            </p>
          ) : (
            <p className="dark:text-primary text-black text-sm mt-2">OTP sent to your email</p>
          )}
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
              <p className="text-primary text-center mb-2">OTP Verified!</p>
            )}
            <div className="text-center mt-4">
              {timer > 0 ? (
                <p className="dark:text-white font-semibold">
                  OTP SENT 00:{timer < 10 ? `0${timer}` : timer}
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  className={`text-red-800 font-serif hover:underline ${
                    isResendDisabled ? "cursor-not-allowed" : ""
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
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer dark:text-black"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
          </span>
          {!isValidPassword && password && (
            <p className="text-red-500 text-sm mt-1">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={!isValidEmail || !isValidPassword || !otpVerified}
          className={`w-full py-3 rounded-lg transition ${
            isValidEmail && isValidPassword && otpVerified
              ? "bg-blue-600 text-white hover:bg-blue-500"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          Register
        </button>

        <p
          className="text-blue-500 text-sm text-center mt-4 cursor-pointer hover:underline"
          onClick={() => navigate("/login1")}
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
