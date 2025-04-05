import React, { useState, useEffect } from "react";
import img1 from "../../assets/Fit/1.webp";
import img2 from "../../assets/Fit/2.webp";
import img3 from "../../assets/Fit/3.webp";
import img4 from "../../assets/Fit/4.jpg";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const fitnessClasses = [
  { image: img1, name: "Yoga", instructor: "John Doe", category: "Yoga", level: "Beginner", duration: "1 hour" },
  { image: img2, name: "HIIT", instructor: "Jane Smith", category: "HIIT", level: "Advanced", duration: "45 mins" },
  { image: img3, name: "Pilates", instructor: "Alice Johnson", category: "Pilates", level: "Intermediate", duration: "1 hour" },
  { image: img4, name: "Strength Training", instructor: "Bob Brown", category: "Strength", level: "Intermediate", duration: "1 hour" },
];

const CountdownTimer = ({ initialHours, initialMinutes, initialSeconds, onEnd }) => {
  const [time, setTime] = useState(initialHours * 3600 + initialMinutes * 60 + initialSeconds);

  useEffect(() => {
    setTime(initialHours * 3600 + initialMinutes * 60 + initialSeconds);
  }, [initialHours, initialMinutes, initialSeconds]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          onEnd();
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
    { title: "EXTRA ₹1250 OFF + 4 MONTHS EXTENSION", description: "ON CODERS-GYM PASS", hours: 4, minutes: 47, seconds: 35, bgColor: "bg-gradient-to-r from-pink-300 to-pink-500" },
    { title: "EXTRA ₹3250 OFF + 2 MONTHS EXTENSION", description: "ON CODERS-GYM TRANSFORM", hours: 5, minutes: 57, seconds: 55, bgColor: "bg-gradient-to-r from-green-300 to-green-500" },
    { title: "EXTRA ₹500 OFF + 3 MONTHS EXTENSION", description: "ON CODERS-GYM ELITE", hours: 5, minutes: 57, seconds: 55, bgColor: "bg-gradient-to-r from-blue-400 to-purple-500" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === offers.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTimerEnd = () => {
    console.log("Timer ended!");
  };

  const arrowBtn = (icon) => (
    <button className="text-white dark:text-black w-10 h-10 rounded-full flex items-center justify-center bg-opacity-60 hover:bg-opacity-100 transition duration-300">
      <span className="text-2xl">{icon}</span>
    </button>
  );

  const offerSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    slidesToShow: 1,
    centerMode: false,
    dotsClass: "slick-dots custom-dots",
  };

  const classSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    centerMode: true,
    centerPadding: "0px",
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <div className="mt-32 dark:bg-black bg-white text-white py-10 px-5 min-h-screen">
      {/* Offer Slider Section */}
      <div className="relative w-[85%] mx-auto mb-32">
        <Slider {...offerSettings}>
          {offers.map((offer, index) => (
            <div key={index} className="px-8">
              <div className={`${offer.bgColor} text-white px-10 py-8 rounded-xl flex flex-col md:flex-row items-center justify-between shadow-lg transition-transform duration-500`}>
                <div className="text-center md:text-left">
                  <h2 className="text-lg font-bold">{offer.title}</h2>
                  <p className="text-sm">{offer.description}</p>
                </div>
                <div className="flex flex-col items-center md:items-end">
                  <span className="text-xs">OFFER ENDS IN</span>
                  <CountdownTimer initialHours={offer.hours} initialMinutes={offer.minutes} initialSeconds={offer.seconds} onEnd={handleTimerEnd} />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* AT - CENTER Classes */}
      <h2 className="text-center text-5xl uppercase dark:text-white text-black font-serif mt-10">
        AT - <span className="text-primary">CENTER</span>
      </h2>
      <h1 className="text-center text-4xl font-extrabold dark:text-white text-black mt-2">
        Trainer-led group classes
      </h1>
      <div className="mt-10 w-full flex justify-center">
        <div className="w-[90%] max-w-[1200px]">
          <Slider {...classSettings}>
            {fitnessClasses.map((cls, index) => (
              <div key={index} className="px-4 flex justify-center w-full">
                <div className="group relative bg-gray-800 rounded-2xl overflow-hidden shadow-lg w-[300px] h-[400px] transform transition-transform duration-300 hover:scale-105">
                  <img src={cls.image} alt={cls.name} className="w-full h-full object-cover rounded-lg" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-gradient-to-r from-pink-400 to-pink-600 text-white py-2 px-6 rounded-full text-lg font-bold">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* AT - HOME Classes */}
      <h2 className="mt-28 text-center text-5xl uppercase dark:text-white text-black font-serif">
        AT - <span className="text-primary">HOME</span>
      </h2>
      <h1 className="text-center text-4xl font-extrabold dark:text-white text-black mt-2">
        Trainer-led group classes
      </h1>
      <div className="mt-10 w-full flex justify-center">
        <div className="w-[90%] max-w-[1200px]">
          <Slider {...classSettings}>
            {fitnessClasses.map((cls, index) => (
              <div key={index} className="px-4 flex justify-center w-full">
                <div className="group relative bg-gray-800 rounded-2xl overflow-hidden shadow-lg w-[300px] h-[400px] transform transition-transform duration-300 hover:scale-105">
                  <img src={cls.image} alt={cls.name} className="w-full h-full object-cover rounded-lg" />
                  <div className="absolute bottom-0 bg-black bg-opacity-70 text-white w-full p-4">
                    <h3 className="text-lg font-bold">{cls.name}</h3>
                    <p className="text-sm">{cls.instructor}</p>
                    <p className="text-xs">{cls.category} • {cls.level} • {cls.duration}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-gradient-to-r from-pink-400 to-pink-600 text-white py-2 px-6 rounded-full text-lg font-bold">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Fitness;
