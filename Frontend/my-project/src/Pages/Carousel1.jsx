import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useAuth } from '../store/auth';

import CoverPhoto1 from '../assets/CoverPhoto1.jpg'
import CoverPhoto2 from '../assets/CoverPhoto2.jpg'
import CoverPhoto3 from '../assets/CoverPhoto3.jpg'
import CoverPhoto4 from '../assets/CoverPhoto4.jpg'
import CoverPhoto5 from '../assets/CoverPhoto5.jpg'
import CoverPhoto6 from '../assets/CoverPhoto6.jpg'

import './styles.css';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

const Data = [


    {
        mobilePhoto: CoverPhoto4,
        CoverPhoto: CoverPhoto1,
        newsDes: "   ",
    },
    {
        mobilePhoto: CoverPhoto5,
        CoverPhoto: CoverPhoto2,
        newsDes: "   ",
    },
    {
        mobilePhoto: CoverPhoto6,
        CoverPhoto: CoverPhoto3,
        newsDes: "   ",
    }
];

export const Carousel = () => {
    const { user } = useAuth();
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <>
            <div className="w-screen h-screen overflow-x-hidden ">
                <div className=" w-full h-full ">
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, Pagination]}
                        onAutoplayTimeLeft={onAutoplayTimeLeft}
                        className="mySwiper"
                    >
                        {Data.map((section, index) => (
                            <SwiperSlide key={index}>
                                <div className=" w-full  h-full">
                                    <img src={section.CoverPhoto} alt={`news ${index + 1}`} className=' hidden md:block h-full w-full bg-cover bg-center' />
                                    <img src={section.mobilePhoto} alt={`news ${index + 1}`} className=' md:hidden block h-full w-full bg-cover bg-center' />
                                </div>
                                <div className=" w-fit h-fit p-5 rounded-lg shadow-md shadow-black flex align-middle justify-center items-center backdrop-blur  absolute z-2">
                                    <h1 className=' text-black font-sans font-bold text-6xl text-left gap-2 '><span className=' text-amber-400 text-4xl '>Welcome</span> <br/> {user.username}</h1>
                                </div>
                            </SwiperSlide>
                        ))}
                        <div className="autoplay-progress" slot="container-end">
                            <svg viewBox="0 0 48 48" ref={progressCircle}>
                                <circle cx="24" cy="24" r="20"></circle>
                            </svg>
                            <span ref={progressContent}></span>
                        </div>
                    </Swiper>
                </div>
            </div>
        </>
    );
}
