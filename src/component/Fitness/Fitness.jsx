import React, { useState, useEffect } from "react";
import img1 from "../../assets/Fit/1.webp";
import img2 from "../../assets/Fit/2.webp";
import img3 from "../../assets/Fit/3.webp";
import img4 from "../../assets/Fit/4.jpg";

// Countdown Timer Component
const CountdownTimer = ({ initialHours = 0, initialMinutes = 0, initialSeconds = 0 }) => {
  const [time, setTime] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(timer);
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <div className="text-center">
        <span className="text-2xl font-bold">{String(time.hours).padStart(2, "0")}</span>
        <p className="text-xs">Hrs</p>
      </div>
      <span className="text-xl font-bold">:</span>
      <div className="text-center">
        <span className="text-2xl font-bold">{String(time.minutes).padStart(2, "0")}</span>
        <p className="text-xs">Mins</p>
      </div>
      <span className="text-xl font-bold">:</span>
      <div className="text-center">
        <span className="text-2xl font-bold">{String(time.seconds).padStart(2, "0")}</span>
        <p className="text-xs">Sec</p>
      </div>
    </div>
  );
};

// Fitness Classes Data
const classes = [
  {
    title: "adidas strength",
    subtitle: "PLYO-AGILITY • ENDURANCE",
    image: img1,
  },
  {
    title: "HRX WORKOUT",
    subtitle: "MUSCLE GAIN • STRENGTH",
    image: img2,
  },
  {
    title: "DANCE FITNESS",
    subtitle: "CARDIO • ENDURANCE",
    image: img3,
  },
  {
    title: "BOXING BAG WORKOUT",
    subtitle: "CORE STRENGTH • FATBURN",
    image: img4,
  },
];

// Main Component
const TrainerClasses = () => {
  return (
    <div className="dark:bg-gray-900 bg-white text-white py-10 px-5 min-h-screen">
      {/* Promotional Banner with Countdown Timer */}
      <div className="mt-36 relative bg-gradient-to-r from-pink-300 to-pink-500 text-white px-8 py-4 rounded-xl flex flex-col md:flex-row items-center justify-between w-[70%] shadow-lg mx-auto">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold">EXTRA ₹1500 OFF + 4 MONTHS EXTENSION</h2>
          <p className="text-sm">on cultpass HOME</p>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <span className="text-xs">Ends In</span>
          <CountdownTimer initialHours={4} initialMinutes={47} initialSeconds={35} />
        </div>
      </div>

      {/* Fitness Classes Section */}
      <h2 className="text-center text-lg uppercase text-gray-400 mt-32">AT-CENTER</h2>
      <h1 className="text-center text-3xl font-bold mt-2">Trainer-led group classes</h1>
      <div className="mt-10 flex flex-wrap justify-center gap-6">
        {classes.map((cls, index) => (
          <div key={index} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg max-w-xs">
            <img src={cls.image} alt={cls.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold">{cls.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{cls.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerClasses;
