import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.css';
import { Carousel } from './Carousel1';
import { useAuth } from '../store/auth';
import pricetag from '../assets/price-tag.png';
import { Navigation } from 'swiper/modules';
import { useCart } from './CartContext';

export const Home = () => {
  const { services } = useAuth();
  const { addToCart } = useCart();

  // Split the services array into two parts
  const firstHalf = services.slice(0, 9);
  const secondHalf = services.slice(10);

  const handleAddToCart = (item) => {
    addToCart(item);
    alert("Added");
  };

  return (
    <>
      <div className="">
        <Carousel />
        <h1 className='text-center text-5xl p-10 font-sans font-bold'>Hot Spice</h1>

        <div className="w-screen h-[410px] sm:h-[460px] overflow-x-hidden px-10 py-5">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {Array.isArray(firstHalf) && firstHalf.map((e, index) => {
              const { product, offer, price, urlToImage, _id } = e;
              return (
                <SwiperSlide key={index}>
                  <div className="border border-black rounded-lg flex w-full h-full flex-col">
                    <img src={urlToImage} className='block h-[75%] md:h-[80%] w-full bg-cover bg-center rounded-tl-lg rounded-tr-lg' />
                    <div className="p-2 pb-2 rounded-bl-md rounded-br-md w-full h-[25%] md:h-[20%]">
                      <h1 className='text-md text-left text-black font-bold'>{product}</h1>
                      <div className="text-sm text-black font-bold flex justify-between">
                        <h1 className='flex gap-2 align-middle items-center justify-center'>
                          <img src={pricetag} className='w-[30px] h-[30px]' />
                          price: {price}
                        </h1>
                        <h1 className='flex gap-2 align-middle items-center justify-center'>
                          <button type="button" onClick={() => handleAddToCart(e)} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700">
                            <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                              <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                            </svg>
                            Add Cart
                          </button>
                        </h1>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <h1 className='text-center text-5xl p-10 font-sans font-bold'>Other Products</h1>

        <div className="w-screen h-[410px] sm:h-[460px] overflow-x-hidden px-10 py-5">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {Array.isArray(secondHalf) && secondHalf.map((e, index) => {
              const { product, offer, price, urlToImage, _id } = e;
              return (
                <SwiperSlide key={index}>
                  <div className="border border-black rounded-lg flex w-full h-full flex-col">
                    <img src={urlToImage} className='block h-[75%] md:h-[80%] w-full bg-cover bg-center rounded-tl-md rounded-tr-md' />
                    <div className=" p-2 pb-2 rounded-bl-md rounded-br-md w-full h-[25%] md:h-[20%]">
                      <h1 className='text-md text-left text-black font-bold'>{product}</h1>
                      <div className="text-sm text-black font-bold flex justify-between">
                        <h1 className='flex gap-2 align-middle items-center justify-center'>
                          <img src={pricetag} className='w-[30px] h-[30px]' />
                          price: {price}
                        </h1>
                        <h1 className='flex gap-2 align-middle items-center justify-center'>
                          <button type="button" onClick={() => handleAddToCart(e)} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700">
                            <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                              <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                            </svg>
                            Add Cart
                          </button>
                        </h1>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};
