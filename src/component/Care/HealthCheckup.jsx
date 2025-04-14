import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    FaUser, FaCapsules, FaShieldAlt, FaMale, FaFemale, FaHeartbeat, FaChild,
    FaCheckCircle, FaPrescriptionBottleAlt, FaHandHoldingHeart, FaRunning,
    FaVial, FaStethoscope, FaLeaf, FaBone, FaWeight, FaTint, FaArrowLeft,
    FaPlus, FaMinus,FaTimes
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

const addonsData = [
    { id: 1, name: "Vitamin Screening", price: 890 },
    { id: 2, name: "T3, T4", price: 590 },
    { id: 3, name: "Iron Screening", price: 690 },
    { id: 4, name: "Testosterone Total", price: 690 },
    { id: 5, name: "CRP Quantitative", price: 490 },
    { id: 6, name: "Insulin - Fasting", price: 790 },
    { id: 7, name: "Blood Grouping", price: 190 },
];

const HealthCheckup = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const selectedPackage = labTestsData.find((pkg) => pkg.id === Number(id)) || labTestsData[0];
    const [selectedAddons, setSelectedAddons] = useState([]);

    const handleAddonSelect = (addon) => {
        setSelectedAddons(prev => {
            const exists = prev.find(item => item.id === addon.id);
            if (exists) {
                return prev.filter(item => item.id !== addon.id);
            }
            return [...prev, addon];
        });
    };

    const calculateTotal = () => {
        const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
        return selectedPackage.offerPrice + addonsTotal;
    };

    const handleBuyPlan = () => {
        const orderDetails = {
            package: selectedPackage,
            addons: selectedAddons,
            total: calculateTotal()
        };
    
        // Store order details in localStorage
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
        
        // Navigate to payment page
        navigate("/payment");
    };

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
                        
                        {/* Package Price and Selected Addons */}
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Package Price</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg text-gray-400 line-through">₹{selectedPackage.originalPrice}</span>
                                    <span className="text-xl font-bold text-red-500">₹{selectedPackage.offerPrice}</span>
                                </div>
                            </div>
                            
                            {/* Selected Addons */}
                            {selectedAddons.length > 0 && (
                                <div className="border-t pt-3">
                                    <h4 className="text-sm font-semibold mb-2">Selected Addons</h4>
                                    <div className="space-y-2">
                                        {selectedAddons.map(addon => (
                                            <div key={addon.id} className="flex items-center justify-between text-sm group">
                                                <span className="text-gray-600">{addon.name}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-red-500">₹{addon.price}</span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleAddonSelect(addon);
                                                        }}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <FaTimes className="text-sm" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {/* Total */}
                            <div className="border-t pt-3">
                                <div className="flex items-center justify-between font-semibold">
                                    <span>Total Amount</span>
                                    <span className="text-xl text-primary">₹{calculateTotal()}</span>
                                </div>
                            </div>
                            
                            <button
                                className="w-full bg-primary dark:text-white px-4 py-2 rounded-lg text-base shadow-md hover:shadow-primary mt-4"
                                onClick={handleBuyPlan}
                            >
                                Buy Plan
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg md:text-xl font-semibold">Recommended Addons</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        {addonsData.map((addon) => (
                            <div
                                key={addon.id}
                                className={`dark:bg-black/80 bg-white/80 p-3 rounded-lg shadow-md hover:shadow-primary text-sm font-medium flex justify-between items-center cursor-pointer transition-all ${
                                    selectedAddons.find(item => item.id === addon.id)
                                        ? 'border-2 border-primary'
                                        : ''
                                }`}
                                onClick={() => handleAddonSelect(addon)}
                            >
                                <span>{addon.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-red-500 font-semibold">₹{addon.price}</span>
                                    {selectedAddons.find(item => item.id === addon.id) ? (
                                        <FaMinus className="text-primary" />
                                    ) : (
                                        <FaPlus className="text-primary" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default HealthCheckup;
