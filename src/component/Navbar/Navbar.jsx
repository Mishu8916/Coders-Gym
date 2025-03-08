import React, { useState } from 'react';
import Logo from '../../assets/Home/logo.png';
import { BiPhoneCall } from 'react-icons/bi';
import DarkMode from './DarkMode';
import { FaDumbbell, FaBars, FaTimes } from "react-icons/fa";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const Navlinks = [
    { id: 1, name: "HOME", link: "/" },
    { id: 2, name: "SERVICES", link: "/services" },
    { id: 3, name: "JOIN", link: "/register" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-dark dark:text-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6">
        <div className="text-xl sm:text-2xl flex items-center gap-2 font-bold uppercase">
          <FaDumbbell />
          <p>Coders</p>
          <p className="text-secondary text-primary">Gym</p>
        </div>

        {/* Desktop Phone and Logo */}
        <div className="hidden md:flex items-center gap-1">
          <BiPhoneCall className="text-2xl text-primary animate-pulse" />
          <span className="mr-24">+91 7070147159</span>
          <img src={Logo} alt="not found" className="w-16 sm:w-24 md:w-32 lg:w-24" />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {Navlinks.map(({ id, name, link }) => (
            <li key={id} className="py-4">
              <a href={link} className="text-lg font-semibold hover:text-primary duration-300">
                {name}
              </a>
            </li>
          ))}
          <DarkMode />
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-dark shadow-lg">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between mb-4">
              <BiPhoneCall className="text-xl text-primary animate-pulse" />
              <span>+91 7070147159</span>
            </div>
            <ul className="space-y-4">
              {Navlinks.map(({ id, name, link }) => (
                <li key={id}>
                  <a 
                    href={link} 
                    className="text-lg font-semibold hover:text-primary duration-300 block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {name}
                  </a>
                </li>
              ))}
              <li>
                <DarkMode />
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;