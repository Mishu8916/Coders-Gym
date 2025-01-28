import React, { useState } from "react";
import { BiDumbbell } from "react-icons/bi";
import img from "../../assets/Landing1/1.avif";
import img1 from "../../assets/Landing1/2.avif";
import img2 from "../../assets/Landing1/3.avif";
import img3 from "../../assets/Landing1/4.avif";
import con1 from "../../assets/Landing1/cotent img/1.avif";
import con2 from "../../assets/Landing1/cotent img/2.avif";
import con3 from "../../assets/Landing1/cotent img/3.avif";
import con4 from "../../assets/Landing1/cotent img/4.avif";
import con5 from "../../assets/Landing1/cotent img/5.avif";
import con6 from "../../assets/Landing1/cotent img/6.avif";
import con7 from "../../assets/Landing1/cotent img/7.avif";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Bmi from "../BMI/Bmi";
import Free_Trial_Modal from "./Free_Trail_Modal";

const Landing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  const swiperData = [
    { id: 1, bgImg: con1, slogan: 'Unleash Your', title: 'Potential', desc: 'Discover the best workouts and nutrition to elevate your fitness journey.' },
    { id: 2, bgImg: con2, slogan: 'Train Like A', title: 'Champion', desc: 'Equip yourself with the tools to perform like a pro.' },
    { id: 3, bgImg: con3, slogan: 'Achieve Your', title: 'Goals', desc: 'Take a step closer to your fitness aspirations with our guidance.' },
    { id: 4, bgImg: con4, slogan: 'Stay Active, Stay', title: 'Healthy', desc: 'Build a healthier lifestyle with our comprehensive programs.' },
    { id: 5, bgImg: con5, slogan: 'Push Your Limits', title: 'Every Day', desc: 'Challenge yourself daily and see incredible results.' },
    { id: 6, bgImg: con6, slogan: 'Fitness Is Your', title: 'Future', desc: 'Invest in your body for long-term health and happiness.' },
    { id: 7, bgImg: con7, slogan: 'Rise And', title: 'Grind', desc: 'Start your mornings with an energetic routine.' },
  ];

  const exercisesData = [
    { id: 1, trainerImg: img, name: "Warm up", duration: 15, sets: 3, calories: 100 },
    { id: 2, trainerImg: img1, name: "Shoulder Workout", duration: 20, sets: 4, calories: 150 },
    { id: 3, trainerImg: img2, name: "Yoga Session", duration: 55, sets: 5, calories: 250 },
    { id: 4, trainerImg: img3, name: "Leg Workout", duration: 18, sets: 4, calories: 120 },
  ];

  return (
    <>
      <div className="w-full h-auto">
        {/* Swiper Section */}
        <Swiper spaceBetween={30} centeredSlides={true} loop={true} autoplay={{ delay: 2500, disableOnInteraction: false }} navigation={true} modules={[Autoplay, Navigation]} className="mySwiper w-full h-screen">
          {swiperData.map((slide) => (
            <SwiperSlide key={slide.id} className="w-full h-full relative">
              <div style={{ backgroundImage: `url(${slide.bgImg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} className="w-full h-full">
                <div className="absolute inset-0 bg-white/30 dark:bg-black/50 duration-300"></div>
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center px-4 z-10">
                  <h5 className="lg:text-7xl md:text-3xl sm:text-2xl text-2xl text-primary font-semibold mb-2 uppercase">{slide.slogan}</h5>
                  <h3 className="lg:text-7xl md:text-5xl sm:text-4xl text-3xl text-white font-bold mb-4">{slide.title}</h3>
                  <p className="lg:text-2xl md:text-md sm:text-sm text-white">{slide.desc}</p>
                  <button onClick={() => setIsModalOpen(true)} className="outline-btn mt-10 text-xl dark:text-white font-bold">
                    7 DAY FREE TRAIL
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Exercises Section */}
        <div className=" dark:bg-dark w-full h-auto flex items-center justify-center flex-col lg:py-16 md:py-14 sm:py-12 py-10 lg:px-24 md:px-16 sm:px-6 px-4">
          <h6 className="mt-10 text-lg font-medium text-gray-200 flex items-center gap-x-2 mb-6">
            <BiDumbbell className="w-10 h-10 -rotate-45 text-primary" />
            <h1 className="text-4xl font-bold text-black dark:text-white font-serif flex">
              Our <p className="ml-2 text-primary">Popular</p>{" "}
              <p className="ml-2">Exercises</p>
            </h1>
          </h6>
          <div className="mt-5 w-full h-auto flex items-center gap-x-5 gap-y-6 lg:flex-nowrap md:flex-wrap sm:flex-wrap flex-wrap">
            {exercisesData.map((item) => (
              <div key={item.id} className="group lg:w-[24%] md:w-[48%] sm:w-[48%] w-full h-auto rounded-lg overflow-hidden hover:shadow-lg hover:shadow-primary ease-out duration-700 cursor-pointer transform transition-transform hover:scale-105">
                <img src={item.trainerImg} alt={item.name} className="w-full lg:h-[30vh] md:h-[33vh] sm:h-[38vh] h-[40vh] object-cover rounded-lg" />
                <div className="w-full h-auto py-4 px-3 opacity-0 group-hover:opacity-100 transform transition-opacity duration-500 ease-in-out">
                  <h1 className="text-lg dark:text-primary text-black font-semibold mb-1">{item.name}</h1>
                  <div className="w-full h-auto flex items-center gap-x-2 dark:text-white">
                    <p className="text-sm">{item.duration} min</p>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <p className="text-sm">{item.sets} Sets</p>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <p className="text-sm">{item.calories} calories</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Free Trial Modal */}
      {isModalOpen && <Free_Trial_Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}

      <Bmi />
      <Footer />
    </>
  );
};

export default Landing;
