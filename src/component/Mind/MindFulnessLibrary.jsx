import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../../assets/Mind/onerep.webp";
import img1 from "../../assets/Mind/covidrecovery.webp";
import img2 from "../../assets/Mind/time.jpg";
import img4 from "../../assets/Mind/running.avif";
import img5 from "../../assets/Mind/meditate.webp";
import img6 from "../../assets/Mind/sleep.webp";
import img7 from "../../assets/Mind/prayanam.webp";

const minddata = [
  { id: 1, title: "One Rep at a time", description: "Join podcast host, Deepak Gopalakrishnan aka Chuck, in his quest to build a fitness habit for life.", packs: "9 Packs", image: img },
  { id: 2, title: "Covid Recovery", description: "This program focuses on bringing stability back into the body through gentle stretches and meditation.", packs: "3 Packs", image: img1 },
  { id: 3, title: "5 Minute Meditations", description: "Panic? Anxiety? We have you all covered with these short 5-minute meditations. Dive in!", packs: "14 Packs", image: img2 },
  { id: 4, title: "Running Programs", description: "Running Programs", packs: "1 Pack", image: img4 },
  { id: 5, title: "Meditation - Foundation", description: "Get started with meditation! This series will guide you through the basic skills of meditation.", packs: "5 Packs", image: img5 },
  { id: 6, title: "Sleep Stories", description: "Say goodbye to sleepless nights! Created by Dr. Shyam Bhat, these stories help you relax and drift into sleep.", packs: "2 Packs", image: img6 },
  { id: 7, title: "Yoga Pranayam", description: "This Pranayam series contains breath practices which have the potential to affect the gross body", packs: "2 Packs", image: img7 },
];

const MindfulnessLibrary = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('');
  };
  return (
    <div className="mt-14 w-full h-auto flex items-center justify-center flex-col lg:py-16 md:py-14 sm:py-12 py-10 lg:px-24 md:px-16 sm:px-6 px-4 dark:bg-black">
      <h6 className="mt-10 text-lg font-medium text-gray-200 flex items-center gap-x-2 mb-6">
        <h1 className="text-4xl font-bold text-black dark:text-white font-serif flex">
          Mindfulness <p className="ml-2 text-primary">Library</p>
        </h1>
      </h6>
      <p className="mb-6 dark:text-white text-center font-serif text-2xl">
        Access our pre-recorded meditation sessions at your convenience
      </p>
      <div className="mt-5 w-full h-auto flex items-center gap-x-5 gap-y-6 lg:flex-nowrap md:flex-wrap sm:flex-wrap flex-wrap">
        {minddata.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item.id)}
            className="group lg:w-[24%] md:w-[48%] sm:w-[48%] w-full h-auto rounded-lg overflow-hidden hover:shadow-lg hover:shadow-primary ease-out duration-700 cursor-pointer transform transition-transform hover:scale-105"
          >
            <div
              className="mt-5 w-full lg:h-[30vh] md:h-[33vh] sm:h-[38vh] h-[40vh] bg-cover rounded-lg mb-4"
              style={{ backgroundImage: `url(${item.image})`, backgroundPosition: "center", backgroundSize: "cover" }}
            ></div>
            <div className="w-full h-auto py-4 px-3 opacity-0 group-hover:opacity-100 transform transition-opacity duration-500 ease-in-out">
              <h1 className="text-lg dark:text-primary text-black font-semibold mb-1">{item.title}</h1>
              <div className="w-full h-auto flex items-center gap-x-2 dark:text-white">
                <p className="text-sm">{item.packs}</p>
              </div>
              <p className="mt-2 text-sm text-gray-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MindfulnessLibrary;
