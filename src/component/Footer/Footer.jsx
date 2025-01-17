import React from "react";
import Logo from "../../assets/logo.png";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaLocationArrow,
    FaMobileAlt,
    FaDumbbell,
} from "react-icons/fa";

export const Navlinks = [
    { id: 1, name: "HOME", link: "/" },
    { id: 2, name: "SERVCES", link: "/services" },
    { id: 3, name: "JOIN", link: "/login" },
  ];

const Footer = () => {
    return (
        <div className="py-10 w-full bg-gray-100 dark:bg-dark dark:text-white duration-300">
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center">
                    {/* Left Section */}
                    <div className="flex items-center justify-center gap-3">
                        <div className="text-2xl flex items-center gap-2 font-bold uppercase">
                            <FaDumbbell />
                            <p>Coders</p>
                            <p className="text-secondary text-primary">Gym</p>
                        </div>
                        <img src={Logo} alt="" className="w-16" />
                        <div>
                            {/* Social Media Links */}
                            <div className="flex items-center gap-3">
                                <a href="#">
                                    <FaInstagram className="text-3xl hover:text-primary duration-300" />
                                </a>
                                <a href="#">
                                    <FaFacebook className="text-3xl hover:text-primary duration-300" />
                                </a>
                                <a href="#">
                                    <FaLinkedin className="text-3xl hover:text-primary duration-300" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Center Section */}
                    <div className="sm:block hidden">
                        <FaMobileAlt className="inline-block mr-2" />
                        +91 7070147159
                    </div>

                    {/* Right Section */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-8">
                            {Navlinks.map(({ id, name, link }) => (
                                <li key={id} className="py-4">
                                    <a
                                        href={link}
                                        className="inline-block text-lg font-semibold hover:text-primary py-1 hover:border-primary transition-colors duration-300"
                                    >
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
            {/* Scrolling Text */}
            <div className="mt-2 overflow-hidden relative w-full h-10 flex justify-center items-center">
                <p className="absolute animate-scroll-fade whitespace-nowrap text-lg font-semibold dark:text-primary">
                    All Rights Reserved - Mishu
                </p>
            </div>
        </div>
    );
};

export default Footer;
