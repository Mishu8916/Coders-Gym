import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60); // Timer for OTP resend
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // Track modal visibility
  const navigate = useNavigate();

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
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

  // Handle OTP input
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; // Allow only numbers

    const updatedOtp = [...otp];
    updatedOtp[index] = element.value;
    setOtp(updatedOtp);

    // If backspace is pressed, focus the previous input
    if (element.value === "" && index > 0) {
      element.previousSibling.focus();
    } else if (element.nextSibling) {
      // Focus next input
      element.nextSibling.focus();
    }
  };

  const handleResend = () => {
    setTimer(60); // Reset timer
    setIsResendDisabled(true);
  };

  const closeModal = () => {
    setIsOpen(false); // Close modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-dark p-8 rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-md overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 bg-white dark:bg-dark dark:text-white text-2xl"
        >
          &times;
        </button>

        {/* OTP Form Title */}
        <h1 className="text-2xl font-bold text-center mb-4">Enter OTP</h1>
        <p className="text-center text-gray-600 dark:text-white mb-8">
          Please enter the code we just sent to <span className="font-medium">your mobile</span> to proceed
        </p>

        {/* OTP Input Boxes */}
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="w-12 h-12 text-center bg-gray-100 dark:bg-dark border border-gray-300 dark:border-gray-700 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              disabled={timer === 0} // Disable OTP input after timer
            />
          ))}
        </div>

        {/* Confirm Button */}
        <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
          Confirm
        </button>

        {/* Timer & Resend */}
        <div className="text-center mt-4">
          {timer > 0 ? (
            <p className="text-gray-400">OTP SENT 00:{timer < 10 ? `0${timer}` : timer}</p>
          ) : (
            <button
              onClick={handleResend}
              className={`text-red-700 hover:underline ${isResendDisabled ? "cursor-not-allowed" : ""}`}
              disabled={isResendDisabled}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTP;
