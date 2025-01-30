import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const OTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(15);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isOpen] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isOtpVisible, setIsOtpVisible] = useState(false);
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        setIsResendDisabled(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = element.value;
    setOtp(updatedOtp);
    if (element.value === "" && index > 0) {
      element.previousSibling.focus();
    } else if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleResend = () => {
    setTimer(30);
    setIsResendDisabled(true);
  };

  const handleVerify = () => {
    if (otp.join("") === "123456") {
      setIsVerified(true);
    } else {
      alert("Invalid OTP");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-dark p-8 rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-md overflow-y-auto max-h-[90vh]">
        <button onClick={() => navigate('/')} className="absolute top-2 right-2 bg-white dark:bg-dark dark:text-white text-2xl">&times;</button>
        <h1 className="text-2xl font-bold text-center mb-4">Enter OTP</h1>
        <p className="text-center text-gray-600 dark:text-white mb-8">Please enter the code we just sent to <span className="font-medium">your mobile</span> to proceed</p>
        <div className="flex justify-center gap-2 mb-6 relative">
          {otp.map((data, index) => (
            <input
              key={index}
              type={isOtpVisible ? "text" : "password"}
              maxLength="1"
              className="w-12 h-12 text-center bg-gray-100 dark:bg-dark border border-gray-300 dark:border-gray-700 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              disabled={timer === 0}
            />
          ))}
          <button onClick={() => setIsOtpVisible(!isOtpVisible)} className="absolute right-[-15px] top-3 text-black dark:text-white">
            {isOtpVisible ? <EyeOff size={24} /> : <Eye size={24} />}
          </button>
        </div>
        {!isVerified ? (
          <button onClick={handleVerify} className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition">Verify</button>
        ) : (
          <button onClick={() => navigate('/Landing')} className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">Confirm</button>
        )}
        <div className="text-center mt-4">
          {timer > 0 ? (
            <p className="dark:text-white font-semibold">OTP SENT 00:{timer < 20 ? `0${timer}` : timer}</p>
          ) : (
            <button onClick={handleResend} className={`text-red-800 font-serif hover:underline ${isResendDisabled ? "cursor-not-allowed" : ""}`} disabled={isResendDisabled}>Resend OTP</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTP;
