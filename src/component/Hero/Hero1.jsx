import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import required modules
import { Autoplay, Navigation } from 'swiper/modules';
// Import images
import img from '../../assets/landing/1.avif';
import img2 from '../../assets/landing/2.avif';
import img3 from '../../assets/landing/3.avif';
import img4 from '../../assets/landing/4.avif';
import img5 from '../../assets/landing/5.avif';

const Hero1 = () => {
    const swiperData = [
        {
            id: 1,
            bgImg: img,
            slogan: 'Keep your body',
            title: 'Burning',
            desc: 'Get ready to burn off some serious fat with our high quality products.',
        },
        {
            id: 2,
            bgImg: img2,
            slogan: 'Just Believe In',
            title: 'Yourself',
            desc: 'We are here to help you achieve your goals.',
        },
        {
            id: 3,
            bgImg: img3,
            slogan: 'Grow Your Body',
            title: 'Strength',
            desc: 'Make your body stronger with our high quality products.',
        },
        {
            id: 4,
            bgImg: img4,
            slogan: 'Fuel Your Fitness',
            title: 'Endurance',
            desc: 'Boost your stamina and achieve your fitness goals with our premium products. ',
        },
        {
            id: 5,
            bgImg: img5,
            slogan: 'Power Up Your Life',
            title: 'Energy',
            desc: 'Stay energized and perform at your best with our top-quality supplements. ',
        },

    ];

    return (
        <div className="w-full h-auto">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Navigation]}
                className="mySwiper w-full h-screen"
            >
                {swiperData.map((slide) => (
                    <SwiperSlide
                        key={slide.id}
                        className="w-full h-full relative"
                    >
                        {/* Background Image */}
                        <div
                            style={{
                                backgroundImage: `url(${slide.bgImg})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                              
                            }}
                            className="w-full h-full"
                        >
                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-white/30  dark:bg-black/50 duration-300"></div>

                            {/* Content */}
                            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center px-4 z-10">
                                <h5 className="lg:text-7xl md:text-3xl sm:text-2xl text-2xl text-primary font-semibold mb-2 uppercase">
                                    {slide.slogan}
                                </h5>
                                <h3 className="lg:text-7xl md:text-5xl sm:text-4xl text-3xl text-white font-bold mb-4">
                                    {slide.title}
                                </h3>
                                <p className="lg:text-2xl md:text-md sm:text-sm text-white">
                                    {slide.desc}
                                </p>

                                <button data-aos="fade-up" className="outline-btn mt-10 text-xl dark:text-white ">
                               Let's Get Started
                            </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Hero1;
