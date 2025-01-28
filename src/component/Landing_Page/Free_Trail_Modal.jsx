import React, { useEffect } from "react";
import { Users, MapPin, Home } from "lucide-react";

const Free_Trial_Modal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling
    }

    // Cleanup when the component is unmounted or modal closes
    return () => {
      document.body.style.overflow = ""; // Re-enable scrolling
    };
  }, [isOpen]);

  if (!isOpen) return null; // Only render the modal if isOpen is true

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="mt-5 w-full max-w-3xl h-auto dark:bg-white/30 bg-black/50 dark:text-black text-white rounded-2xl p-6 relative mx-4 sm:mx-8 lg:mx-16">
        {/* Close Button in the top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl"
        >
          &times;
        </button>
        <div className="flex justify-center items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4 text-center">
  TAKE <span className="text-primary">A FREE</span> TRAIL
</h1>
        </div>
        <h2 className="dark:text-white mb-6 items-center text-center text-2xl">Access <span className="text-primary">CODER'S GYM</span> with home workouts</h2>
        <div className="space-y-6">
          {/* Group Classes */}
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <Users className="text-primary w-8 h-8" />
              <div>
                <h2 className="text-4xl font-serif">Group Classes</h2>
                <p className="text-xl dark:text-white">Yoga, Dance Fitness, Strength and more</p>
                <hr></hr>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start mt-4 sm:mt-0">
              <button className="border hover:bg-primary hover:text-black dark:text-white px-4 py-2 rounded-md">
                BOOK NOW
              </button>
              <p className="mt-2 dark:text-white">02 Free Sessions</p>
            </div>

          </div>

          {/* Gym Sessions */}
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <MapPin className="text-primary w-8 h-8" />
              <div>
              <h2 className="text-4xl font-serif">Gym Session</h2>
              <p className="text-xl dark:text-white">Workout at ELITE and PRO gyms</p>
              <hr></hr>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start mt-4 sm:mt-0">
              <button className="border hover:bg-primary hover:text-black dark:text-white px-4 py-2 rounded-md">
                BOOK NOW
              </button>
              <p className="mt-2 dark:text-white">02 Free Sessions</p>
            </div>
          </div>

          {/* 7-Day Home Trial */}
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <Home className="text-primary w-8 h-8" />
              <div>
              <h2 className="text-4xl font-serif">7-DAY HOME TRIAL</h2>
              <p className="text-xl dark:text-white">Workout at home with calorie tracking</p>
              <hr></hr>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start mt-4 sm:mt-0">
              <button className="border hover:bg-primary hover:text-black dark:text-white px-4 py-2 rounded-md">
                BOOK NOW
              </button>
              <p className="mt-2 dark:text-white">02 Free Sessions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Free_Trial_Modal;
