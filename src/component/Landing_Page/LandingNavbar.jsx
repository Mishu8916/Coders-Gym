import React, { useState, useEffect } from 'react';
import Logo from '../../assets/Home/logo.png';
import { BiPhoneCall } from 'react-icons/bi';
import DarkMode from '../Navbar/DarkMode';
import { FaDumbbell, FaUser } from "react-icons/fa";
import { FaAngleDoubleDown } from 'react-icons/fa';
import Landing from './Landing';

export const LandingNavbar = () => {
  const Navlinks = [
    { id: 1, name: "HOME", link: "/" },
    { id: 2, name: "SERVICES", link: "/services" },
    { id: 3, icon: <FaUser />, link: "/" }, //profile's page navigation
  ];
  const SecondaryLinks = [
    { id: 4, name: "FITNESS", link: "/fit" },
    { id: 5, name: "CARE", link: "/Labtests" },
    { id: 6, name: "MIND", link: "/mind" },
  ];

  // State to track the visibility of the options
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Toggle menu visibility when the arrow is clicked
  const handleArrowClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  // Close the menu if clicked outside of the menu area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.options-container') && !event.target.closest('.arrow-icon')) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
            <span className="mr-24">+91 7070147159</span>
            <img src={Logo} alt="not found" className="mr-40 ml-2 w-16 sm:w-24 md:w-32 lg:w-24" />
          </div>

          <ul className="flex items-center gap-8">
            {Navlinks.map(({ id, name, link, icon }) => (
              <li key={id} className="py-4 flex items-center gap-2">
                <a href={link} className="text-lg font-semibold hover:text-primary duration-300">
                  {icon && <span className="text-2xl">{icon}</span>}
                  {name}
                </a>
              </li>
            ))}
            <DarkMode />
          </ul>
        </div>

        {/* Arrow icon */}
        <div className="flex justify-center relative -mt-3 ml-1">
          <FaAngleDoubleDown
            className="text-lg dark:text-primary animate-bounce cursor-pointer arrow-icon"
            onClick={handleArrowClick}
          />
          
          {/* Options container that will slide down */}
          {isMenuVisible && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 transition-all duration-300 ease-in-out">
            <ul className="dark:bg-dark/40 bg-white/40 shadow-lg rounded-lg p-2 w-max space-x-16 flex gap-10">
              {SecondaryLinks.map(({ id, name, link }) => (
                <li key={id} className="py-2">
                  <a href={link} className="text-lg font-semibold hover:text-primary duration-300">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          )}
        </div>
      </nav>
     
      <Landing />
    </>
  );
};

export default LandingNavbar;
