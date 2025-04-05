import React, { useState, useEffect } from 'react';
import Logo from '../../assets/Home/logo.png';
import { BiPhoneCall } from 'react-icons/bi';
import DarkMode from '../Navbar/DarkMode';
import { FaDumbbell } from "react-icons/fa";
import { FaAngleDoubleDown } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaSignOutAlt, FaBars, FaTimes,FaEnvelope } from 'react-icons/fa';

export const LandingNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const Navlinks = [
    { id: 1, name: "HOME", link: "/landing" },
    { id: 3, name: "SERVICES", link: "/auth/services"  },
    { id: 2, name: "PROFILE", link: "/profile", icon: <FaUser />},
    { id: 6, name: "CONTACT", link: "/contact_us", icon: <FaEnvelope /> },
    ];

  const SecondaryLinks = [
    { id: 4, name: "FITNESS", link: "/fit" },
    { id: 5, name: "CARE", link: "/Labtests" },
    { id: 6, name: "MIND", link: "/mind" },
  ];

  const handleArrowClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

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
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-dark dark:text-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6">
        <Link to="/landing" className="text-xl sm:text-2xl flex items-center gap-2 font-bold uppercase">
          <FaDumbbell />
          <p>Coders</p>
          <p className="text-secondary text-primary">Gym</p>
        </Link>

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
        <ul className="hidden md:flex items-center gap-6">
          {Navlinks.map(({ id, name, link, icon }) => (
            <li key={id}>
              <Link
                to={link}
                className="text-lg font-semibold hover:text-primary duration-300 flex items-center gap-2"
              >
                {icon || name}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="text-lg font-semibold dark:text-white text-black duration-300 flex items-center gap-2 hover:fill-primary"
            >
              <FaSignOutAlt className="transition-colors duration-100 hover:text-primary" />
            </button>
          </li>
          <li>
            <DarkMode />
          </li>
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
              {Navlinks.map(({ id, name, link, icon }) => (
                <li key={id}>
                  <Link
                    to={link}
                    className="text-lg font-semibold hover:text-primary duration-300 flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {icon || name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-lg font-semibold dark:text-white text-black duration-300 flex items-center gap-2 hover:fill-primary"
                >
                  <FaSignOutAlt className="transition-colors duration-100 hover:text-primary" />
                </button>
              </li>
              <li>
                <DarkMode />
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Secondary Menu */}
      <div className="hidden md:flex justify-center relative -mt-3 -mr-2 ml-24">
        <FaAngleDoubleDown
          className="text-lg dark:text-primary animate-bounce cursor-pointer arrow-icon"
          onClick={handleArrowClick}
        />
        
        {isMenuVisible && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 transition-all duration-300 ease-in-out options-container">
            <ul className="dark:bg-dark/40 bg-white/40 shadow-lg rounded-lg p-2 w-max space-x-8 flex gap-10">
              {SecondaryLinks.map(({ id, name, link }) => (
                <li key={id} className="py-2">
                  <Link
                    to={link}
                    className="text-lg font-semibold hover:text-primary duration-300"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingNavbar;