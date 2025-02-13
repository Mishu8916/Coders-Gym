import React from "react";
import { useNavigate } from "react-router-dom";

import { FaUser, FaCapsules, FaShieldAlt, FaMale, FaFemale, FaHeartbeat, FaChild, FaCheckCircle, FaPrescriptionBottleAlt, FaHandHoldingHeart, FaRunning, FaVial, FaStethoscope, FaLeaf, FaBone, FaWeight, FaTint } from "react-icons/fa"; // Importing icons from react-icons

const labTestsData = [
  { id: 1, name: "Full Body Checkup", originalPrice: 1990, offerPrice: 990, bgColor: "bg-purple-200", Icon: FaUser },
  { id: 2, name: "Vitamin Profile", originalPrice: 590, offerPrice: 890, bgColor: "bg-green-200", Icon: FaCapsules },
  { id: 3, name: "Thyroid Screening", originalPrice: 1990, offerPrice: 450, bgColor: "bg-blue-200", Icon: FaShieldAlt },
  { id: 4, name: "Fitness Essentials - Men", originalPrice: 2990, offerPrice: 1990, bgColor: "bg-yellow-200", Icon: FaMale },
  { id: 5, name: "Fitness Essentials - Women", originalPrice: 2990, offerPrice: 1990, bgColor: "bg-orange-200", Icon: FaFemale },
  { id: 6, name: "Sr.Citizen Advance Package - male", originalPrice: 5999, offerPrice: 2990, bgColor: "bg-teal-200", Icon: FaMale },
    { id: 7, name: "Sr.Citizen Advance Package - female", originalPrice: 5990, offerPrice: 2990, bgColor: "bg-red-200", Icon: FaFemale },
  { id: 8, name: "Iron Screening", originalPrice: 990, offerPrice: 690, bgColor: "bg-lime-200", Icon: FaHeartbeat },
  { id: 9, name: "Women Health", originalPrice: 3490, offerPrice: 1690, bgColor: "bg-emerald-200", Icon: FaChild },
  { id: 10, name: "PCOD Profile", originalPrice: 2990, offerPrice: 999, bgColor: "bg-cyan-200", Icon: FaCheckCircle },
  { id: 11, name: "Dibetes Screeing", originalPrice: 590, offerPrice: 490, bgColor: "bg-rose-200", Icon: FaPrescriptionBottleAlt },
  { id: 12, name: "Immunity Screeing", originalPrice: 2590, offerPrice: 1390, bgColor: "bg-indigo-200", Icon: FaHandHoldingHeart },
  { id: 13, name: "Energy Screeing", originalPrice: 1490, offerPrice: 990, bgColor: "bg-fuchsia-200", Icon: FaRunning },
  { id: 14, name: "Pregnancy Test", originalPrice: 790, offerPrice: 590, bgColor: "bg-violet-200", Icon: FaVial },
  { id: 15, name: "Kidney Test", originalPrice: 390, offerPrice: 290, bgColor: "bg-sky-200", Icon: FaStethoscope },
  { id: 16, name: "Hairfall Test", originalPrice: 2390, offerPrice: 1190, bgColor: "bg-amber-200", Icon: FaLeaf },
  { id: 17, name: "Bone Test", originalPrice: 1490, offerPrice: 990, bgColor: "bg-gray-200", Icon: FaBone },
  { id: 18, name: "Liver Test", originalPrice: 790, offerPrice: 590, bgColor: "bg-purple-200", Icon: FaWeight },
  { id: 19, name: "Obesity", originalPrice: 990, offerPrice: 590, bgColor: "bg-red-200", Icon: FaTint },
  { id: 20, name: "Anemia", originalPrice: 790, offerPrice: 490, bgColor: "bg-gray-200", Icon: FaPrescriptionBottleAlt },


];

const LabTests = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen dark:bg-black flex flex-col items-center py-10 px-6 mt-28">
      <h1 className="text-4xl font-bold dark:text-white mb-4 font-serif">Lab <span className="text-primary">Tests</span></h1>
      <p className="dark:text-white font-mono underline text-2xl mb-8 py-2 ">
        Assess and monitor your health from the comfort of your home now.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-7xl h-auto">
        {labTestsData.map((test) => (
          <div
          onClick={() => navigate(`/healthcheckup/${test.id}`)}

            className={`relative p-6 rounded-lg shadow-lg ${test.bgColor} flex flex-col items-center h-72 transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer`}
          >
            {/* Background Icon */}
            <div className="absolute inset-0 opacity-10 flex items-center justify-center">
              <test.Icon className="text-[10rem] text-dark mt-10" />
            </div>

            {/* Text Content */}
            <div className="absolute bottom-4 left-4 right-4  rounded-lg p-4 flex flex-col items-center shadow-md shadow-primary z-10">
              <h2 className="text-lg font-semibold text-gray-900 mb-1 text-center">
                {test.name}
              </h2>
              <p className="text-gray-500 line-through text-sm">
                Price: ₹{test.originalPrice}
              </p>
              <p className="text-lg font-bold text-gray-900">
                Offer Price: ₹{test.offerPrice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabTests;
