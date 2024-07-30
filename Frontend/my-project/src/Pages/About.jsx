import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import kartik from '../assets/kartik.png';
import ganesh from '../assets/ganesh.png';
import nirmalJi from '../assets/nirmalJi.jpg';
import Lucky from '../assets/Lucky.png';
import SatyNarayanJi from '../assets/SatyNarayanJi.png';
import shashi from '../assets/shashi.png';
import shopping from '../assets/about.png'
import shopping1 from '../assets/shopping1.png'
import orderNow from '../assets/orderNow.png'

import './styles.css';
import { Navigation } from 'swiper/modules';

const Data3 = [
    {
        id: 1,
        newsImg: nirmalJi,
        newsDes: "Founder & CEO",
    },
    {
        id: 2,
        newsImg: kartik,
        newsDes: "Socialmedia Manager",
    },
    {
        id: 3,
        newsImg: ganesh,
        newsDes: "Technical Manager",
    },
    {
        id: 4,
        newsImg: Lucky,
        newsDes: "Marketing Manager",
    },
    {
        id: 5,
        newsImg: SatyNarayanJi,
        newsDes: "Marketing Manager",
    },
    {
        id: 6,
        newsImg: shashi,
        newsDes: "Product Desginer",
    }
];

export const About = () => {
    return (
        <>
            <div className=" text-7xl mt-16 sm:text-8xl font-bold w-screen h-[30vh] bg-[#FFB800] text-black flex align-middle justify-center items-center">
                About Us
            </div>
            <div className="">
                <h1 className=' text-center text-5xl p-10 font-sans font-bold'>Our Teem</h1>

                <div className="w-screen h-[300px] overflow-x-hidden px-5 sm:px-10 py-5">
                    <Swiper
                        spaceBetween={30}
                        //centeredSlides={true}
                        //loop={true}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                        slidesPerGroup={1} // This ensures the swiper moves one slide at a time
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                            1280: {
                                slidesPerView: 5,
                            }
                        }}
                    >
                        {Data3.map((section, index) => (
                            <SwiperSlide key={index}>
                                <img src={section.newsImg} alt={`news ${index + 1}`} className=' bg-black absolute z-0 rounded-md block h-full w-[200px] bg-cover bg-center' />
                                <div className=" bottom-10 w-[190px] flex items-center align-middle justify-center rounded-md h-8 bg-black absolute z-2 text-white">{section.newsDes}</div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className=" w-screen h-auto  flex px-10 sm:px-20 py-5 flex-col sm:flex-row">
                <div className="w-full sm:w-1/2 flex flex-col py-5 sm:py-10 gap-5 lg:gap-10">
                    <h1 className=' text-4xl lg:text-5xl font-bold '>
                        Who We Are
                    </h1>
                    <p className=' text-md lg:text-xl '>
                        Founded in 2020, ShopEase has quickly grown into a trusted name in the e-commerce industry. Our team comprises passionate individuals who are committed to delivering exceptional service and an unparalleled shopping experience. With a focus on innovation, quality, and customer satisfaction, we strive to be the preferred online shopping destination for millions of shoppers worldwide.
                    </p>
                </div>
                <div className="w-full sm:w-1/2 flex align-middle justify-center items-start sm:items-center ">
                    <img src={shopping} className=' w-[400px] h-[400px]' />
                </div>
            </div>
            <div className=" w-screen h-auto  flex px-10 sm:px-20 py-5 flex-col-reverse sm:flex-row  ">
                <div className="w-full sm:w-1/2 flex align-middle justify-center items-start sm:items-center">
                    <img src={shopping1} className=' w-[400px] h-[400px]' />
                </div>
                <div className="w-full sm:w-1/2 flex flex-col py-5 sm:py-10 gap-5 lg:gap-10">
                    <h1 className=' text-4xl lg:text-5xl font-bold '>
                        Our Values
                    </h1>
                    <p className='text-md lg:text-xl  '>
                        <li>Customer Satisfaction: Our customers are at the heart of everything we do. We are committed to providing excellent customer service and support to ensure a pleasant shopping experience.</li>
                        <li> Quality Assurance: We carefully curate our product selection to ensure that you receive only the best quality items.</li>
                        <li> Innovation: We continuously seek new ways to improve our platform and services, leveraging the latest technology to enhance your shopping experience.</li>
                        <li> Integrity: We operate with transparency, honesty, and respect in all our interactions.</li>
                    </p>
                </div>
            </div>
            <div className="w-screen h-auto  flex px-10 sm:px-20 py-5 flex-col sm:flex-row ">
                <div className="w-full sm:w-1/2 flex flex-col py-5 sm:py-10 gap-5 lg:gap-10">
                    <h1 className=' text-4xl lg:text-5xl font-bold  '>
                        Who We Are
                    </h1>
                    <p className='text-md lg:text-xl '>
                        <li>Free Delivery on Orders Over ₹500: At Choti Dukan, enjoy free delivery on all orders exceeding ₹500, ensuring your purchases reach you conveniently and affordably.</li>
                        <li> 20% Discount on Every Item: Benefit from a generous 20% discount on every item you purchase, making your shopping experience both economical and rewarding.</li>
                        <li>Flexible Return Policy: We offer a hassle-free return policy, allowing you to return products easily if they don't meet your expectations. Shop confidently at Choti Dukan, where customer satisfaction is our priority.</li>
                    </p>
                </div>
                <div className="w-full sm:w-1/2 flex align-middle justify-center items-start sm:items-center ">
                    <img src={orderNow} className=' w-[400px] h-[400px]' />
                </div>
            </div>
        </>
    );
};
