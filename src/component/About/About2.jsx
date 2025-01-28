import React from 'react';
import BannerImg from '../../assets/Home/yoga.png';
import { useNavigate } from 'react-router-dom';

export const About2 = () => {
    const navigate=useNavigate();
    return (
        <div className="py-14 dark:bg-dark bg-slate-100 duration-300">
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    {/* Left Section (Text) */}
                    <div className="space-y-5 sm:p-16 pb-6">
                        <div data-aos="zoom-in" className="flex items-center gap-4">
                            <div className="text-primary/70 text-7xl">
                                <h1 className="font-bold">02</h1>
                            </div>
                            <div>
                                <p className="text-primary">Yoga Club</p>
                                <h1 className="text-2xl sm:text-4xl font-bold dark:text-white">
                                    Fitness with us
                                </h1>
                            </div>
                        </div>
                        <p data-aos="fade-up" className="text-xl font-serif leading-8 tracking-wide dark:text-white">
                        Ensuring that everyone feels welcome and empowered.
                        </p>
                        <p className="text-xl font-serif dark:text-white" data-aos="fade-up" data-aos-delay="300">
                        Discover a place where your fitness aspirations become reality. From strength training to cardio workouts, we provide the tools and expertise you need to sculpt your body, boost your energy, and enhance your overall well-being.
                        </p>
                        <button data-aos="fade-up" className="outline-btn dark:text-white"
                        onClick={()=>navigate('/login')}>
                            Get Started
                        </button>
                    </div>

                    {/* Right Section (Image) */}
                    <div data-aos="fade-up" className="flex justify-center">
                        <img
                            src={BannerImg}
                            alt="Yoga Club Banner"
                            className="rounded-md sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default About2;
