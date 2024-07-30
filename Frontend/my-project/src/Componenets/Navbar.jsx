import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from '../store/auth';
import HomePNG from '../assets/home.png'
import Info from '../assets/info.png'
import person from '../assets/person.png'
import logout from '../assets/log-out.png'
import signup from '../assets/signup.png'
import orderPng from '../assets/purchase.png'
import unknown from '../assets/Unknown_person.jpg'


const MobileMenu = ({ isLoggedIn, isHamburgerMenuOpen, closeHamburger }) => {

    const { user } = useAuth();

    return (
        <>
            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200  dark:bg-gray-800 dark:border-gray-700 ${isHamburgerMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <h2 className=" border p-2 rounded-md flex items-center justify-center align-middle text-2xl text-white font-bold">  Hi! {user ? user.username : `user`}</h2>
                    <ul className="space-y-2 mt-4 font-medium">
                        <li>
                            <NavLink to="/" onClick={closeHamburger} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" aria-current="page"><img src={HomePNG} className=' w-[20px] h-[20px]' /> <span className="flex-1 ms-3 whitespace-nowrap">Home</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/About" onClick={closeHamburger} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" aria-current="page"><img src={Info} className=' w-[20px] h-[20px]' /> <span className="flex-1 ms-3 whitespace-nowrap">About Us</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" onClick={closeHamburger} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" aria-current="page"><img src={person} className=' w-[20px] h-[20px]' /> <span className="flex-1 ms-3 whitespace-nowrap">Contact</span></NavLink>
                        </li>
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <NavLink to="/logout" onClick={closeHamburger} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" aria-current="page"><img src={logout} className=' w-[20px] h-[20px]' /> <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span></NavLink>
                                </li>
                                <li>
                                    <NavLink to="/UserPanel" onClick={closeHamburger} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap">Users</span></NavLink>
                                </li>
                                <li>
                                    <NavLink to="/:id/MyCart" onClick={closeHamburger} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" aria-current="page"><img src={orderPng} className=' w-[20px] h-[20px]' /> <span className="flex-1 ms-3 whitespace-nowrap">My Cart</span></NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/register" onClick={closeHamburger} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" aria-current="page"><img src={signup} className=' w-[20px] h-[20px]' /> <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span></NavLink>
                                </li>
                                <li>
                                    <NavLink to="/login" onClick={closeHamburger} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span></NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </aside >
        </>
    );
};

export const Navbar = () => {
    const { isLoggedIn, LogoutUser } = useAuth();
    const [isHamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);

    const toggleHamburger = () => {
        setHamburgerMenuOpen(!isHamburgerMenuOpen);
    };

    const closeHamburger = () => {
        setHamburgerMenuOpen(false);
    };

    const toggleUserMenu = () => {
        setUserMenuOpen(!isUserMenuOpen);
    };
 
    const { user } = useAuth();


    return (
        <>
            <nav className="fixed w-full z-50 bg-white border-gray-200 dark:bg-gray-900">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end gap-4">
                            <button
                                onClick={toggleHamburger}
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                aria-expanded={isHamburgerMenuOpen}
                                type="button"
                                className="inline-flex items-center p-2 text-md text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>
                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                <img src={logo} className="h-12" alt="News App Logo" />
                                {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Choti Dukan</span> */}
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div className='z-0 absolute right-6'>
                                    <button
                                        type="button"
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                        aria-expanded={isUserMenuOpen}
                                        onClick={toggleUserMenu}
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src={unknown}
                                            alt="user photo"
                                        />
                                    </button>
                                </div>
                                <div className={`z-50 absolute h-fit w-fit right-5 mt-44 text-base  bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 ${isUserMenuOpen ? 'block' : 'hidden'}`} id="dropdown-user">
                                    <div className="  px-4 py-3">
                                        <h2 className="text-2xl text-white font-bold">{user ? user.username : `user`}</h2>
                                        <p className="text-white">{user ? user.email : `Please Register`}</p>
                                        <p className="text-white">{user.phone}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <MobileMenu isLoggedIn={isLoggedIn} isHamburgerMenuOpen={isHamburgerMenuOpen} closeHamburger={closeHamburger} />
        </>

    );
};