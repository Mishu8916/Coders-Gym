import React, { useState } from "react";
import { FaQrcode } from "react-icons/fa";

const labTestsData = [
  { id: 1, name: "Full Body Checkup", originalPrice: 1990, offerPrice: 990 },
  { id: 2, name: "Vitamin Profile", originalPrice: 590, offerPrice: 890 },
  { id: 3, name: "Thyroid Screening", originalPrice: 1990, offerPrice: 450 },
  { id: 4, name: "Fitness Essentials - Men", originalPrice: 2990, offerPrice: 1990 },
  { id: 5, name: "Fitness Essentials - Women", originalPrice: 2990, offerPrice: 1990 },
  { id: 6, name: "Sr.Citizen Advance Package - Male", originalPrice: 5999, offerPrice: 2990 },
  { id: 7, name: "Sr.Citizen Advance Package - Female", originalPrice: 5990, offerPrice: 2990 },
  { id: 8, name: "Iron Screening", originalPrice: 990, offerPrice: 690 },
  { id: 9, name: "Women Health", originalPrice: 3490, offerPrice: 1690 },
  { id: 10, name: "PCOD Profile", originalPrice: 2990, offerPrice: 999 },
  { id: 11, name: "Diabetes Screening", originalPrice: 590, offerPrice: 490 },
  { id: 12, name: "Immunity Screening", originalPrice: 2590, offerPrice: 1390 },
  { id: 13, name: "Energy Screening", originalPrice: 1490, offerPrice: 990 },
  { id: 14, name: "Pregnancy Test", originalPrice: 790, offerPrice: 590 },
  { id: 15, name: "Kidney Test", originalPrice: 390, offerPrice: 290 },
  { id: 16, name: "Hairfall Test", originalPrice: 2390, offerPrice: 1190 },
  { id: 17, name: "Bone Test", originalPrice: 1490, offerPrice: 990 },
  { id: 18, name: "Liver Test", originalPrice: 790, offerPrice: 590 },
  { id: 19, name: "Obesity", originalPrice: 990, offerPrice: 590 },
  { id: 20, name: "Anemia", originalPrice: 790, offerPrice: 490 }
];

const PaymentPage = () => {
  const [selectedTest, setSelectedTest] = useState(labTestsData[0]);
  const paymentUrl = `https://yourpaymentgateway.com/pay?amount=${selectedTest.offerPrice}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-96 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Scan to Pay</h2>
        <FaQrcode className="text-9xl mb-4 text-gray-700" />
        <p className="text-black mb-2 text-lg">{selectedTest.name}</p>
        <p className="text-black mb-4 text-lg">Amount: ₹{selectedTest.offerPrice}</p>
        
        <select
          className="mb-4 p-2 border rounded w-full text-gray-900"
          onChange={(e) => setSelectedTest(labTestsData.find(test => test.id == e.target.value))}
        >
          {labTestsData.map((test) => (
            <option key={test.id} value={test.id}>{test.name}</option>
          ))}
        </select>
        
        <button
          className="w-full bg-blue-500 text-white p-2 rounded font-bold transition duration-300 hover:bg-blue-700"
          onClick={() => window.location.href = paymentUrl}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
