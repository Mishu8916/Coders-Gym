import React, { useState } from 'react';
import { BiDumbbell } from 'react-icons/bi';
import Label from '../../component/Label/Label';
import Input from '../../component/Form/Input';

const Bmi = () => {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBMI] = useState(null);

    const calculateBMI = () => {
        if (weight && height) {
            const calculatedBMI = (weight / ((height * height) / 10000)).toFixed(2);
            setBMI(calculatedBMI);
        } else {
            setBMI(null);
        }
    };

    return (
        <div className="flex flex-col items-center py-10 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-36 dark:bg-black bg-white mt-5 w-full">
            {/* Header */}
            <h6 className="text-2xl sm:text-3xl font-serif dark:text-white text-black flex items-center gap-2 rounded-t-md py-3 px-4 sm:px-6">
                <BiDumbbell className="w-6 h-6 dark:text-primary text-black transform -rotate-45" />
                YOUR <span className="text-primary">BMI</span>
            </h6>

            {/* Form Section */}
            <div className="w-full dark:bg-black rounded-b-md p-4 sm:p-6 flex flex-col items-center space-y-6 max-w-4xl">
                <div className="w-full flex flex-col lg:flex-row justify-between gap-6">
                    {/* Weight Input */}
                    <div className="flex-1">
                        <Label htmlFor="weight" className="ml-2 !text-black dark:!text-white font-serif !text-lg sm:!text-xl">
                            Weight (kg)
                        </Label>
                        <Input
                            id="weight"
                            name="weight"
                            type="text"
                            placeholder="Enter your weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="mt-2 !text-base sm:!text-xl text-black w-full"
                        />
                    </div>

                    {/* Height Input */}
                    <div className="flex-1">
                        <Label htmlFor="height" className="ml-2 dark:!text-white !text-black font-serif !text-lg sm:!text-xl">
                            Height (cm)
                        </Label>
                        <Input
                            id="height"
                            name="height"
                            type="text"
                            placeholder="Enter your height"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="mt-2 !text-base sm:!text-xl text-black w-full"
                        />
                    </div>
                </div>

                {/* Button */}
                <div className="grid place-items-center">
                    <button
                        className="inline-block font-serif py-2 px-4 sm:px-6 bg-outline dark:text-white hover:bg-primary/80 duration-200 tracking-widest uppercase border-2 mt-3 text-base sm:text-lg"
                        onClick={calculateBMI}>
                        Calculate Your BMI
                    </button>
                </div>

                {/* Result */}
                {bmi !== null && (
                    <div className="px-4 py-2.5">
                        <p className="dark:text-primary font-serif text-base sm:text-lg">
                            Your BMI: <span className="font-bold">{bmi}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bmi;
