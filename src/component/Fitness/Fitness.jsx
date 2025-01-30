import React from "react";

const classes = [
  {
    title: "adidas strength",
    subtitle: "PLYO-AGILITY • ENDURANCE",
    image: "https://via.placeholder.com/300", // Replace with actual image
  },
  {
    title: "HRX WORKOUT",
    subtitle: "MUSCLE GAIN • STRENGTH",
    image: "https://via.placeholder.com/300", // Replace with actual image
  },
  {
    title: "DANCE FITNESS",
    subtitle: "CARDIO • ENDURANCE",
    image: "https://via.placeholder.com/300", // Replace with actual image
  },
  {
    title: "BOXING BAG WORKOUT",
    subtitle: "CORE STRENGTH • FATBURN",
    image: "https://via.placeholder.com/300", // Replace with actual image
  },
];

const TrainerClasses = () => {
  return (
    <div className="dark:bg-gray bg-white dark:bg-black text-white py-10 px-5 min-h-screen">
      <h2 className="text-center text-lg uppercase text-gray-400 mt-32">AT-CENTER</h2>
      <h1 className="text-center text-3xl font-bold mt-2">Trainer-led group classes</h1>
      <div className="mt-10 flex flex-wrap justify-center gap-6">
        {classes.map((cls, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg max-w-xs"
          >
            <img
              src={cls.image}
              alt={cls.title}
              className="w-full h-64 object-cover"
            />
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
