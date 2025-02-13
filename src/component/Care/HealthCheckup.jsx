import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaUser, FaCapsules, FaShieldAlt, FaMale, FaFemale, FaHeartbeat, FaChild, 
  FaCheckCircle, FaPrescriptionBottleAlt, FaHandHoldingHeart, FaRunning, 
  FaVial, FaStethoscope, FaLeaf, FaBone, FaWeight, FaTint, FaArrowLeft 
} from "react-icons/fa";

const labTestsData = [
    { id: 1, name: "Full Body Checkup", originalPrice: 1990, offerPrice: 990, bgColor: "bg-purple-200", Icon: FaUser },
    { id: 2, name: "Vitamin Profile", originalPrice: 590, offerPrice: 890, bgColor: "bg-green-200", Icon: FaCapsules },
    { id: 3, name: "Thyroid Screening", originalPrice: 1990, offerPrice: 450, bgColor: "bg-blue-200", Icon: FaShieldAlt },
    { id: 4, name: "Fitness Essentials - Men", originalPrice: 2990, offerPrice: 1990, bgColor: "bg-yellow-200", Icon: FaMale },
    { id: 5, name: "Fitness Essentials - Women", originalPrice: 2990, offerPrice: 1990, bgColor: "bg-orange-200", Icon: FaFemale },
    { id: 6, name: "Sr.Citizen Advance Package - Male", originalPrice: 5999, offerPrice: 2990, bgColor: "bg-teal-200", Icon: FaMale },
    { id: 7, name: "Sr.Citizen Advance Package - Female", originalPrice: 5990, offerPrice: 2990, bgColor: "bg-red-200", Icon: FaFemale },
    { id: 8, name: "Iron Screening", originalPrice: 990, offerPrice: 690, bgColor: "bg-lime-200", Icon: FaHeartbeat },
    { id: 9, name: "Women Health", originalPrice: 3490, offerPrice: 1690, bgColor: "bg-emerald-200", Icon: FaChild },
    { id: 10, name: "PCOD Profile", originalPrice: 2990, offerPrice: 999, bgColor: "bg-cyan-200", Icon: FaCheckCircle },
    { id: 11, name: "Diabetes Screening", originalPrice: 590, offerPrice: 490, bgColor: "bg-rose-200", Icon: FaPrescriptionBottleAlt },
    { id: 12, name: "Immunity Screening", originalPrice: 2590, offerPrice: 1390, bgColor: "bg-indigo-200", Icon: FaHandHoldingHeart },
    { id: 13, name: "Energy Screening", originalPrice: 1490, offerPrice: 990, bgColor: "bg-fuchsia-200", Icon: FaRunning },
    { id: 14, name: "Pregnancy Test", originalPrice: 790, offerPrice: 590, bgColor: "bg-violet-200", Icon: FaVial },
    { id: 15, name: "Kidney Test", originalPrice: 390, offerPrice: 290, bgColor: "bg-sky-200", Icon: FaStethoscope },
    { id: 16, name: "Hairfall Test", originalPrice: 2390, offerPrice: 1190, bgColor: "bg-amber-200", Icon: FaLeaf },
    { id: 17, name: "Bone Test", originalPrice: 1490, offerPrice: 990, bgColor: "bg-gray-200", Icon: FaBone },
    { id: 18, name: "Liver Test", originalPrice: 790, offerPrice: 590, bgColor: "bg-purple-200", Icon: FaWeight },
    { id: 19, name: "Obesity", originalPrice: 990, offerPrice: 590, bgColor: "bg-red-200", Icon: FaTint },
    { id: 20, name: "Anemia", originalPrice: 790, offerPrice: 490, bgColor: "bg-gray-200", Icon: FaPrescriptionBottleAlt },
];

const HealthCheckup = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const selectedPackage = labTestsData.find((pkg) => pkg.id === Number(id)) || labTestsData[0];

    return (
        <div className="mt-24 fixed inset-0 flex items-center justify-center dark:bg-black overflow-auto px-4">
            <div className="p-4 w-full max-w-4xl dark:bg-dark rounded-lg shadow-lg shadow-primary transition-transform duration-300 hover:scale-105 relative">
                <button onClick={() => navigate(-1)} className="absolute top-4 left-2 px-4 py-2 rounded-lg flex items-center">
                    <FaArrowLeft className="mr-2" />
                </button>
                <div className="flex flex-col md:flex-row items-center md:items-start">
                    <div className="w-full md:w-1/3 p-3 flex flex-col items-center">
                        <div className={`${selectedPackage.bgColor} rounded-lg flex flex-col items-center justify-center h-40 w-40`}>
                            {React.createElement(selectedPackage.Icon, { className: "text-8xl mb-2" })}
                        </div>
                        <h3 className="text-lg font-semibold mt-3">{selectedPackage.name}</h3>
                    </div>
                    <div className="w-full md:w-2/3 text-center md:text-left">
                        <h2 className="text-xl md:text-2xl font-semibold">{selectedPackage.name}</h2>
                        <p className="text-gray-600 text-sm md:text-base mt-2">Comprehensive health analysis for early detection and wellness tracking.</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3 text-sm text-gray-500">
                            <span>🧪 Multiple Tests</span>
                            <span>⏳ Report in 36 Hrs</span>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-start items-center mt-4">
                            <span className="text-lg text-gray-400 line-through mr-3">₹{selectedPackage.originalPrice}</span>
                            <span className="text-xl font-bold text-red-500">₹{selectedPackage.offerPrice}</span>
                            <button className="ml-4 bg-primary dark:text-white px-4 py-2 rounded-lg text-base shadow-md hover:shadow-primary">
                                Buy Plan
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg md:text-xl font-semibold">Recommended Addons</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        {[ 
                            { name: "Vitamin Screening", price: "₹890" },
                            { name: "T3, T4", price: "₹590" },
                            { name: "Iron Screening", price: "₹690" },
                            { name: "Testosterone Total", price: "₹690" },
                            { name: "CRP Quantitative", price: "₹490" },
                            { name: "Insulin - Fasting", price: "₹790" },
                            { name: "Blood Grouping", price: "₹190" },
                        ].map((addon, index) => (
                            <div key={index} className="dark:bg-black/80 bg-white/80 p-3 rounded-lg shadow-md hover:shadow-primary text-sm font-medium flex justify-between items-center">
                                <span>{addon.name}</span>
                                <span className="text-red-500 font-semibold">{addon.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthCheckup;
