import React from 'react'
import BannerImg from '../../assets/pushup1.png'
export const About3 = () => {
    return (
        <div className="py-14 dark:bg-black bg-slate-100 duration-300">
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center">
                    <div data-aos="fade-up">
                        <img
                            src={BannerImg}
                            alt=""
                            className="rounded-md sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)] mx-auto"
                        />
                    </div>
                    <div>
                        <div className="space-y-5 sm:p-16 pb-6">
                            <div data-aos="zoom-in" className="flex items-center gap-4">
                                <div className="text-primary/70 text-7xl ">
                                    <h1 className="font-bold">03</h1>
                                </div>
                                <div>
                                    <p className="text-primary">Muscel Up</p>
                                    <h1 className="text-2xl sm:text-4xl font-bold dark:text-white">Pump with us</h1>
                                </div>
                            </div>
                            <p data-aos="fade-up" className="text-xl font-serif leading-8 tracking-wide dark:text-white">
                            Join our vibrant community and experience the transformation that awaits you at G-Tech GYMs. Your fitness journey begins here.

                            </p>
                            <p className="text-xl font-serif dark:text-white" data-aos="fade-up" data-aos-delay="300">
                            Just one small positive thought in the morning can change your whole day.
                            </p>
                            <button data-aos="fade-up" className="outline-btn">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default About3;