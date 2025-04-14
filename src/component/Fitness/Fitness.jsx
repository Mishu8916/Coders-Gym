import React, { useState, useEffect } from "react";
import img1 from "../../assets/Fit/1.webp";
import img2 from "../../assets/Fit/2.webp";
import img3 from "../../assets/Fit/3.webp";
import img4 from "../../assets/Fit/4.jpg";
import img5 from "../../assets/Fit/5.jpg";
import img6 from "../../assets/Fit/6.jpg";
import img7 from "../../assets/Fit/7.jpg";
import img8 from "../../assets/Fit/8.jpg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Pricing from "../Pricing/pricing";
import Footer from "../Footer/Footer";

// =============== Modified Data Arrays with Multiple Images ===============
const centerFitnessClasses = [
  {
    images: [img1, img2],
    name: "Yoga",
    instructor: "John Doe",
    category: "Yoga",
    level: "Beginner",
    duration: "1 hour",
  },
  {
    images: [img3, img4],
    name: "HIIT",
    instructor: "Jane Smith",
    category: "HIIT",
    level: "Advanced",
    duration: "45 mins",
  },
  {
    images: [img1, img4],
    name: "Pilates",
    instructor: "Alice Johnson",
    category: "Pilates",
    level: "Intermediate",
    duration: "1 hour",
  },
  {
    images: [img2, img3],
    name: "Strength Training",
    instructor: "Bob Brown",
    category: "Strength",
    level: "Intermediate",
    duration: "1 hour",
  },
];

const homeFitnessClasses = [
  {
    images: [img5, img6],
    name: "Zumba",
    instructor: "Emily Carter",
    category: "Dance",
    level: "Beginner",
    duration: "45 mins",
  },
  {
    images: [img6, img7],
    name: "Core Blast",
    instructor: "David Miller",
    category: "Core",
    level: "Advanced",
    duration: "30 mins",
  },
  {
    images: [img7, img8],
    name: "Stretch & Relax",
    instructor: "Sarah Lee",
    category: "Stretching",
    level: "All Levels",
    duration: "1 hour",
  },
  {
    images: [img8, img5],
    name: "Cardio Burn",
    instructor: "Tom Wilson",
    category: "Cardio",
    level: "Intermediate",
    duration: "45 mins",
  },
];

// =============== Countdown Timer ===============
const CountdownTimer = ({ initialHours, initialMinutes, initialSeconds, onEnd }) => {
  const [time, setTime] = useState(initialHours * 3600 + initialMinutes * 60 + initialSeconds);

  useEffect(() => {
    setTime(initialHours * 3600 + initialMinutes * 60 + initialSeconds);
  }, [initialHours, initialMinutes, initialSeconds]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) return prevTime - 1;
        onEnd();
        return 0;
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

// =============== Custom Dots for Slick ===============
const CustomDots = ({ currentSlide, slideCount, onClick }) => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: slideCount }).map((_, i) => (
        <button
          key={i}
          onClick={() => onClick(i)}
          className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
            currentSlide === i ? "bg-black dark:bg-white" : "bg-gray-300 dark:bg-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

// =============== Card with Vertical Navigation ===============
const FitnessCard = ({ classData }) => {
  const [index, setIndex] = useState(0);
  const images = classData.images;

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="group relative bg-gray-800 rounded-2xl overflow-hidden shadow-lg w-[300px] h-[400px] transform transition-transform duration-300 hover:scale-105">
      <img src={images[index]} alt={classData.name} className="w-full h-full object-cover rounded-lg" />

      {images.length > 1 && (
        <div className="absolute top-0 right-0 h-full flex flex-col justify-center p-2 space-y-2 z-10">
          <button onClick={handlePrev} className="bg-white bg-opacity-60 hover:bg-opacity-90 p-1 rounded-full text-black text-xl">
            ↑
          </button>
          <button onClick={handleNext} className="bg-white bg-opacity-60 hover:bg-opacity-90 p-1 rounded-full text-black text-xl">
            ↓
          </button>
        </div>
      )}

      <div className="absolute bottom-0 w-full p-4 transform transition-all duration-300 opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 bg-black bg-opacity-70 text-white">
        <h3 className="text-lg font-bold">{classData.name}</h3>
        <p className="text-sm">{classData.instructor}</p>
        <p className="text-xs">
          {classData.category} • {classData.level} • {classData.duration}
        </p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="bg-gradient-to-r from-pink-400 to-pink-600 text-white py-2 px-6 rounded-full text-lg font-bold">
          Book Now
        </button>
      </div>
    </div>
  );
};

// =============== Main Component ===============
const Fitness = () => {
  const offers = [
    {
      title: "EXTRA ₹1250 OFF + 4 MONTHS EXTENSION",
      description: "ON CODERS-GYM PASS",
      hours: 4,
      minutes: 47,
      seconds: 35,
      bgColor: "bg-gradient-to-r from-pink-300 to-pink-500",
    },
    {
      title: "EXTRA ₹3250 OFF + 2 MONTHS EXTENSION",
      description: "ON CODERS-GYM TRANSFORM",
      hours: 5,
      minutes: 57,
      seconds: 55,
      bgColor: "bg-gradient-to-r from-green-300 to-green-500",
    },
    {
      title: "EXTRA ₹500 OFF + 3 MONTHS EXTENSION",
      description: "ON CODERS-GYM ELITE",
      hours: 5,
      minutes: 57,
      seconds: 55,
      bgColor: "bg-gradient-to-r from-blue-400 to-purple-500",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [offers.length]);

  const handleTimerEnd = () => {
    console.log("Timer ended!");
  };

  const baseSliderSettings = {
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    appendDots: (dots) => (
      <CustomDots
        currentSlide={dots.props.children.findIndex((c) =>
          c.props.className?.includes("slick-active")
        )}
        slideCount={dots.props.children.length}
        onClick={(i) => dots.props.children[i].props.children.props.onClick()}
      />
    ),
    customPaging: () => <></>,
  };

  const offerSettings = {
    ...baseSliderSettings,
    slidesToScroll: 1,
    slidesToShow: 1,
  };

  const classSettings = {
    ...baseSliderSettings,
    slidesToScroll: 1,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="mt-32 dark:bg-black bg-white text-white py-10 px-5 min-h-screen">
      {/* === Offer Slider === */}
      <div className="relative w-[85%] mx-auto mb-32">
        <Slider {...offerSettings}>
          {offers.map((offer, index) => (
            <div key={index} className="px-8">
              <div
                className={`${offer.bgColor} text-white px-10 py-8 rounded-xl flex flex-col md:flex-row items-center justify-between shadow-lg`}
              >
                <div className="text-center md:text-left">
                  <h2 className="text-lg font-bold">{offer.title}</h2>
                  <p className="text-sm">{offer.description}</p>
                </div>
                <div className="flex flex-col items-center md:items-end">
                  <span className="text-xs">OFFER ENDS IN</span>
                  <CountdownTimer
                    initialHours={offer.hours}
                    initialMinutes={offer.minutes}
                    initialSeconds={offer.seconds}
                    onEnd={handleTimerEnd}
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* === Center Classes === */}
      <h2 className="text-center text-5xl uppercase dark:text-white text-black font-serif mt-10">
        AT - <span className="text-primary">CENTER</span>
      </h2>
      <h1 className="text-center text-4xl font-extrabold dark:text-white text-black mt-2">
        Trainer-led group classes
      </h1>
      <div className="mt-10 w-full flex justify-center">
        <div className="w-[90%] max-w-[1200px]">
          <Slider {...classSettings}>
            {centerFitnessClasses.map((cls, index) => (
              <div key={index} className="px-4 flex justify-center w-full">
                <FitnessCard classData={cls} />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* === Home Classes === */}
      <h2 className="mt-28 text-center text-5xl uppercase dark:text-white text-black font-serif">
        AT - <span className="text-primary">HOME</span>
      </h2>
      <h1 className="text-center text-4xl font-extrabold dark:text-white text-black mt-2">
        Trainer-led group classes
      </h1>
      <div className="mt-10 w-full flex justify-center">
        <div className="w-[90%] max-w-[1200px]">
          <Slider {...classSettings}>
            {homeFitnessClasses.map((cls, index) => (
              <div key={index} className="px-4 flex justify-center w-full">
                <FitnessCard classData={cls} />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="text-black dark:text-white">
      <Pricing />
        <Footer />
      </div>
    </div>
  );
};

export default Fitness;
