import React from 'react';
import Logo from '../../assets/Home/logo.png';
import { BiPhoneCall } from 'react-icons/bi';
import DarkMode from '../Navbar/DarkMode';
import { FaDumbbell, FaUser } from "react-icons/fa"; 
import Landing from './Landing';
export const LandingNavbar = () => {
  const Navlinks = [
    { id: 1, name: "HOME", link: "/" },
    { id: 2, name: "SERVICES", link: "/services" },
    { id: 3, icon: <FaUser />, link: "/" }, //profile's page navigation
  ];

  return (
    <>
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-dark dark:text-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-2xl flex items-center gap-2 font-bold uppercase">
          <FaDumbbell />
          <p>Coders</p>
          <p className="text-secondary text-primary">Gym</p>
        </div>

        <div className="flex items-center gap-1">
          <BiPhoneCall className="text-2xl text-primary animate-pulse" />
          <span className="mr-36">+91 7070147159</span>
          <img src={Logo} alt="not found" className="w-16 sm:w-24 md:w-32 lg:w-24" />
        </div>

        <ul className="flex items-center gap-8">
          {Navlinks.map(({ id, name, link, icon }) => (
            <li key={id} className="py-4 flex items-center gap-2">
              <a href={link} className="text-lg font-semibold hover:text-primary duration-300">
                {icon && <span className="text-2xl">{icon}</span>} {/* Render icon if available */}
                {name}
              </a>
            </li>
          ))}
          <DarkMode />      
        </ul>
      </div>
    </nav>

    <Landing />
  </>  );
};

export default LandingNavbar;
