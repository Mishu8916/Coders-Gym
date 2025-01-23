import React from "react";
import { BiDumbbell } from "react-icons/bi";
import img from "../../assets/Landing1/1.avif";
import img1 from "../../assets/Landing1/2.avif";
import img2 from "../../assets/Landing1/3.avif";
import img3 from "../../assets/Landing1/4.avif";

const Landing = () => {
  const exercisesData = [
    {
      id: 1,
      trainerImg: img,
      name: "Warm up",
      duration: 15,
      sets: 3,
      calories: 100,
    },
    {
      id: 2,
      trainerImg: img1,
      name: "Shoulder Workout",
      duration: 20,
      sets: 4,
      calories: 150,
    },
    {
      id: 3,
      trainerImg: img2,
      name: "Yoga Session",
      duration: 55,
      sets: 5,
      calories: 250,
    },
    {
      id: 4,
      trainerImg: img3,
      name: "Leg Workout",
      duration: 18,
      sets: 4,
      calories: 120,
    },
  ];

  return (
    <div className="mt-28 w-full h-auto flex items-center justify-center flex-col lg:py-16 md:py-14 sm:py-12 py-10 lg:px-24 md:px-16 sm:px-6 px-4">
      <h6 className="text-lg font-medium text-gray-200 flex items-center gap-x-2 mb-6">
        <BiDumbbell className="w-10 h-10 -rotate-45 text-primary" />
        <h1 className="text-4xl font-bold text-black dark:text-white font-serif flex">
          Our <p className="ml-2 text-primary">Popular</p> <p className="ml-2">Exercises</p>
        </h1>
      </h6>
      <div className="w-full h-auto flex items-center gap-x-5 gap-y-6 lg:flex-nowrap md:flex-wrap sm:flex-wrap flex-wrap">
        {exercisesData.map((item) => (
          <div
            key={item.id}
            className="group lg:w-[24%] md:w-[48%] sm:w-[48%] w-full h-auto rounded-lg overflow-hidden hover:shadow-lg hover:shadow-primary ease-out duration-700 cursor-pointer transform transition-transform hover:scale-105"
          >
            <img
              src={item.trainerImg}
              alt={item.name}
              className="w-full lg:h-[30vh] md:h-[33vh] sm:h-[38vh] h-[40vh] object-cover rounded-lg"
            />
            <div className="w-full h-auto py-4 px-3 opacity-0 group-hover:opacity-100 transform transition-opacity duration-500 ease-in-out">
              <h1 className="text-lg dark:text-primary text-black font-semibold mb-1">
                {item.name}
              </h1>
              <div className="w-full h-auto flex items-center gap-x-2 text-gray-600">
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
  );
};

export default Landing;
