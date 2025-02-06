
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const ForgotPassword = () => {
  // State declarations for the various steps and UI flags
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  // step: 1 => Enter email, 2 => Verify OTP, 3 => Reset Password
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Timer effect for OTP resend
  useEffect(() => {
    let interval = null;
    if (timer > 0 && isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, isResendDisabled]);

  // Simple email validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  // OTP change handler for individual input boxes
  const handleOtpChange = (e, index) => {
    if (isNaN(e.target.value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = e.target.value;
    setOtp(updatedOtp);
    if (e.target.value !== "" && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  // API call: Send OTP to the provided email
  const handleSendOtp = async () => {
    if (!isEmailValid) {
      setMessage("Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/Frp-api/forgetsend-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "OTP sent successfully!");
        setStep(2);
        setIsResendDisabled(true);
        setTimer(30);
      } else {
        setMessage(data.error || "Failed to send OTP.");
      }
    } catch (error) {
      setMessage("An error occurred while sending OTP.");
    }
    setLoading(false);
  };

  // API call: Verify the entered OTP
  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setMessage("Please enter a complete 6-digit OTP.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/Frp-api/forgetverify-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: enteredOtp }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "OTP verified successfully!");
        setStep(3);
      } else {
        setMessage(data.error || "OTP verification failed.");
      }
    } catch (error) {
      setMessage("An error occurred during OTP verification.");
    }
    setLoading(false);
  };

  // API call: Reset password using the new password
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setMessage("Password should be at least 6 characters long.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/Frp-api/forgetreset-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, new_password: newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Password reset successfully!");
        // Optionally, redirect to login page after a brief delay
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage(data.error || "Password reset failed.");
      }
    } catch (error) {
      setMessage("An error occurred during password reset.");
    }
    setLoading(false);
  };

  // Resend OTP handler
  const handleResend = async () => {
    setIsResendDisabled(true);
    setTimer(30);
    await handleSendOtp();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="relative bg-white/80 dark:bg-black/50 p-8 rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-md overflow-y-auto max-h-[90vh] shadow-primary">
        <button onClick={() => navigate('/')} className="absolute top-2 right-2 text-2xl">
          &times;
        </button>
        
        {step === 1 && (
          <>
            <h1 className="text-2xl font-serif text-center mb-4">
              Enter <span className="text-primary font-serif">Your</span> Email
            </h1>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className={`w-full dark:text-black p-3 mb-2 border-2 hover:border-primary rounded-lg ${email && !isEmailValid ? 'border-red-500' : 'border-gray-300'}`} 
              value={email} 
              onChange={handleEmailChange}
            />
            {!isEmailValid && email && (
              <p className="text-red-500 text-sm mb-2">Invalid email address</p>
            )}
            <button 
              onClick={handleSendOtp} 
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
              disabled={!isEmailValid || loading}
            >
              {loading ? "Sending OTP..." : "Continue"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-2xl font-serif text-center mb-4">
              Enter <span className="text-primary">Your</span> OTP
            </h1>
            <p className="text-center text-gray-600 dark:text-white mb-8">
              Please enter the OTP sent to your email.
            </p>
            <div className="flex justify-center gap-2 mb-6 relative">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type={isOtpVisible ? "text" : "password"}
                  maxLength="1"
                  className="w-12 h-12 text-center dark:text-black border rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-primary"
                  value={data}
                  onChange={(e) => handleOtpChange(e, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
              <button onClick={() => setIsOtpVisible(!isOtpVisible)} className="absolute right-[-15px] top-3">
                {isOtpVisible ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>
            <button 
              onClick={handleVerifyOtp} 
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
              disabled={loading}
            >
              {loading ? "Verifying OTP..." : "Verify"}
            </button>
            <div className="text-center mt-4">
              {isResendDisabled ? (
                <p className="font-semibold">
                  OTP SENT 00:{timer < 10 ? `0${timer}` : timer}
                </p>
              ) : (
                <button onClick={handleResend} className="text-red-800 font-serif hover:underline" disabled={loading}>
                  Resend OTP
                </button>
              )}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-2xl font-serif text-center mb-4">Reset Password</h1>
            <div className="relative mb-4">
              <input 
                type={isNewPasswordVisible ? "text" : "password"} 
                placeholder="New Password" 
                className="w-full p-3 border-2 dark:text-black hover:border-primary rounded-lg" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)} className="absolute dark:text-black right-3 top-3">
                {isNewPasswordVisible ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>
            <div className="relative mb-4">
              <input 
                type={isConfirmPasswordVisible ? "text" : "password"} 
                placeholder="Confirm Password" 
                className="w-full p-3 border-2 hover:border-primary dark:text-black rounded-lg" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} className="absolute dark:text-black right-3 top-3">
                {isConfirmPasswordVisible ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>
            <button 
              onClick={handleResetPassword} 
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
              disabled={loading}
            >
              {loading ? "Resetting Password..." : "Confirm"}
            </button>
          </>
        )}

        {message && (
          <p className="text-center text-sm mt-2 text-green-500">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
