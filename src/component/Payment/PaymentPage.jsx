import React, { useEffect, useState } from "react";
import { FaQrcode, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const storedOrderDetails = localStorage.getItem("orderDetails");
    if (storedOrderDetails) {
      try {
        setOrderDetails(JSON.parse(storedOrderDetails));
      } catch (error) {
        console.error("Error parsing order details:", error);
      }
    }
  }, []);

  if (!orderDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-black p-4">
        <div className="bg-white dark:bg-dark p-6 rounded-2xl shadow-lg text-center w-96">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            No Order Details Found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-blue-500 text-white p-2 rounded font-bold transition duration-300 hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { package: selectedPackage, addons, total } = orderDetails;

  return (
    <div className="mt-16 h-screen overflow-hidden bg-gray-100 dark:bg-black p-4 " >
      <div className="max-w-4xl mx-auto flex items-center justify-center h-full transition-transform duration-300 hover:scale-105">
        <div className="relative bg-white dark:bg-dark p-6 rounded-2xl shadow-lg shadow-primary w-full max-w-2xl">
          {/* Back Arrow in top-left corner */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 text-black-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
          >
            <FaArrowLeft size={15} />
          </button>

          {/* Centered Title */}
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white text-center">
            Order Summary
          </h2>
          <h3 className="text-xl font-semibold mb-6 text-primary text-center">
            {selectedPackage.name}
          </h3>

          {/* Package Details */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-black/50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Test Price</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 line-through">
                  ₹{selectedPackage.originalPrice}
                </span>
                <span className="text-red-500 font-semibold">
                  ₹{selectedPackage.offerPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Addons */}
          {addons.length > 0 && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-black/50 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                Selected Addons
              </h3>
              <div className="space-y-3">
                {addons.map((addon) => (
                  <div key={addon.id} className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">{addon.name}</span>
                    <span className="text-red-500">₹{addon.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="border-t dark:border-gray-700 pt-4 mb-8">
            <div className="flex justify-between items-center text-xl font-bold">
              <span className="text-gray-900 dark:text-white">Total Amount</span>
              <span className="text-primary">₹{total}</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="text-center mb-2">
            <div className="bg-white dark:bg-black/50 p-4 rounded-lg shadow-md  shadow-primary inline-block">
              <FaQrcode className="text-9xl mx-auto mb-4 text-gray-700 dark:text-gray-300" />
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Scan to pay ₹{total}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
