import React, { useState, useEffect } from "react";
import img1 from "../../assets/Fit/1.webp";
import img2 from "../../assets/Fit/2.webp";
import img3 from "../../assets/Fit/3.webp";
import img4 from "../../assets/Fit/4.jpg";
import Slider from "react-slick"; // Import Slider component

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const fitnessClasses = [
  { title: "adidas strength", subtitle: "PLYO-AGILITY • ENDURANCE", image: img1 },
  { title: "HRX WORKOUT", subtitle: "MUSCLE GAIN • STRENGTH", image: img2 },
  { title: "DANCE FITNESS", subtitle: "CARDIO • ENDURANCE", image: img3 },
  { title: "BOXING BAG WORKOUT", subtitle: "CORE STRENGTH • FATBURN", image: img4 },
];

const CountdownTimer = ({ initialHours, initialMinutes, initialSeconds, onEnd }) => {
  const [time, setTime] = useState(
    initialHours * 3600 + initialMinutes * 60 + initialSeconds
  );

  useEffect(() => {
    setTime(initialHours * 3600 + initialMinutes * 60 + initialSeconds); // Reset the timer when the offer changes
  }, [initialHours, initialMinutes, initialSeconds]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          onEnd(); // Notify when the timer ends
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onEnd]);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return <span className="text-lg font-bold">{formatTime(time)}</span>;
};

const Fitness = () => {
  const offers = [
    {
      title: "EXTRA ₹1250 OFF + 4 MONTHS EXTENSION",
      description: "ON CODERS-GYM PASS",
      hours: 4,
      minutes: 47,
      seconds: 35,
      color: "text-red-500",
      bgColor: "bg-gradient-to-r from-pink-300 to-pink-500",
    },
    {
      title: "EXTRA ₹3250 OFF + 2 MONTHS EXTENSION",
      description: "ON CODERS-GYM TRANSFORM",
      hours: 5,
      minutes: 57,
      seconds: 55,
      color: "text-green-500",
      bgColor: "bg-gradient-to-r from-green-300 to-green-500",
    },
    {
      title: "EXTRA ₹500 OFF + 3 MONTHS EXTENSION",
      description: "ON CODERS-GYM ELITE",
      hours: 5,
      minutes: 57,
      seconds: 55,
      color: "text-green-500",
      bgColor: "bg-gradient-to-r from-blue-400 to-purple-500",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Define the handleTimerEnd function
  const handleTimerEnd = () => {
    console.log("Timer ended!");
  };

  // Auto-scroll the offers every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === offers.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Manual navigation functions
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    beforeChange: (current, next) => {
      setCurrentIndex(next);
    },
    customPaging: (i) => (
      <div
        style={{
          width: "20px",               // Adjust the line length
          height: "4px",               // Thickness for horizontal line
          backgroundColor: i === currentIndex
            ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "black" : "white")
            : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "gray" : "lightgray"),
          margin: "15px 4px",             // Space between lines
          transition: "background-color 0.3s ease", // Smooth color transition
        }}
      />
    ),
  };

  return (
    <div className="mt-32 dark:bg-black bg-white text-white py-10 px-5 min-h-screen">
      <div className="relative w-[70%] mx-auto">
        <Slider {...settings}>
          {offers.map((offer, index) => (
            <div key={index}>
              <div
                className={`${offer.bgColor} text-white px-10 py-8 rounded-xl flex flex-col md:flex-row items-center justify-between shadow-lg transition-transform duration-500`}
              >
                <div className="text-center md:text-left">
                  <h2 className="text-lg font-bold">{offer.title}</h2>
                  <p className="text-sm">{offer.description}</p>
                </div>
                <div className="flex flex-col items-center md:items-end">
                  <span className="text-xs">OFFER END <sapa>IN</sapa></span>
                  <CountdownTimer
                    initialHours={offer.hours}
                    initialMinutes={offer.minutes}
                    initialSeconds={offer.seconds}
                    onEnd={handleTimerEnd} // Pass the function
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <h2 className="text-center text-lg uppercase text-gray-400 mt-10">AT-CENTER</h2>
      <h1 className="text-center text-3xl font-bold mt-2">Trainer-led group classes</h1>
      <div className="mt-10 flex flex-wrap justify-center gap-10">
        {fitnessClasses.map((cls, index) => (
          <div
            key={index}
            className="group relative bg-gray-800 rounded-2xl overflow-hidden shadow-lg max-w-md p-5 transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={cls.image}
              alt={cls.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-xl font-bold dark:text-white">{cls.title}</h3>
              <p className="text-sm font-medium dark:text-gray-400">{cls.subtitle}</p>
              <button className="mt-4 bg-gradient-to-r from-pink-400 to-pink-600 text-white py-2 px-6 rounded-full hover:scale-105 transition-all">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fitness;
