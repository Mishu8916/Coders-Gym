import React from "react";
import { BiDumbbell } from "react-icons/bi";
import TertiaryLink from "../Form/TertiaryLink";
import Serviceimg from "../../assets/ServicesImg/1.avif";
import Serviceimg1 from "../../assets/ServicesImg/2.avif";
import Serviceimg2 from "../../assets/ServicesImg/3.avif";
import Serviceimg3 from "../../assets/ServicesImg/4.avif";
import Serviceimg4 from "../../assets/ServicesImg/5.avif";
import Serviceimg5 from "../../assets/ServicesImg/6.avif";
import Serviceimg6 from "../../assets/ServicesImg/7.webp";
import Serviceimg7 from "../../assets/ServicesImg/8.avif";
import Footer from "../Footer/Footer";
import LandingNavbar from "../Landing_Page/LandingNavbar";
const Services = () => {
  const services = [
    {
      id: 1,
      serviceImg: Serviceimg,
      title: "Fitness",
      desc: "Get ready to burn off some serious fat with our high-quality products.",
    },
    {
      id: 2,
      serviceImg: Serviceimg1,
      title: "Yoga",
      desc: "Get ready to burn off some serious fat with our high-quality products.",
    },
    {
      id: 3,
      serviceImg: Serviceimg2,
      title: "Gym",
      desc: "Get ready to burn off some serious fat with our high-quality products.",
    },
    {
      id: 4,
      serviceImg:Serviceimg3,
      title: "Aerobics",
      desc: "Get ready to burn off some serious fat with our high-quality products.",
    },
    {
      id: 5,
      serviceImg:  Serviceimg4,
      title: "Boxing",
      desc: "Get ready to burn off some serious fat with our high-quality products.",
    },
    {
      id: 6,
      serviceImg: Serviceimg5,
      title: "Cycling",
      desc: "Get ready to burn off some serious fat with our high-quality products.",
    },
    {
      id: 7,
      serviceImg:  Serviceimg6,
      title: "Weight Lifting",
      desc: "Get ready to burn off some serious fat with our high-quality products.",
    },
    {
      id: 8,
      serviceImg: Serviceimg7,
      title: "Zumba",
      desc: "Get ready to burn off some serious fat with our high-quality products.",
    },
  ];

  return (
    <>
    <div className="mt-28 w-full h-auto flex items-center justify-center flex-col lg:py-16 md:py-14 sm:py-12 py-10 lg:px-24 md:px-16 sm:px-6 px-4">
      <h6 className="text-lg font-medium text-gray-200 flex items-center gap-x-2 mb-6">
        <BiDumbbell className="w-10 h-10 -rotate-45 text-primary" />
        <h1 className="text-4xl font-bold text-black dark:text-white font-serif flex">Our <p className="ml-2 text-primary">Services</p></h1>
        </h6>
      <div className="w-full h-auto flex items-center justify-center gap-x-4 gap-y-5 flex-wrap m-10">
        {services.map((data) => (
          <div
            key={data.id}
            className="lg:w-[24%] md:w-[48%] sm:w-[48%] w-full lg:h-[50vh] md:h-[53vh] sm:h-[58vh] h-[60vh] rounded-xl relative overflow-hidden cursor-pointer group hover:-translate-y-2 ease-out duration-500 shadow-lg hover:shadow-primary"
          >
            {/* Image */}
            <img
              src={data.serviceImg}
              alt={data.title}
              className="w-full h-full object-cover rounded-xl"
            />

            {/* Hover Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-center z-10 transition-opacity duration-500">
              <div className="w-14 h-14 rounded-full border-4 border-primary flex items-center justify-center mb-5">
                <BiDumbbell className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-xl text-white font-semibold">{data.title}</h1>
              <h1 className="text-lg text-white font-semibold">{data.desc}</h1>
              <TertiaryLink link={data.link}>Read More</TertiaryLink>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Services;
