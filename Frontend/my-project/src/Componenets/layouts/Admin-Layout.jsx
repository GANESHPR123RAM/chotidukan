import React, { useState } from 'react';
import { NavLink, Navigate, Outlet } from "react-router-dom";
import HomePNG from '/src/assets/home.png';
import Info from '/src/assets/info.png';
import person from '/src/assets/person.png';
import Loading from '/src/assets/loading.gif';
import { useAuth } from '../../store/auth';

const MobileMenu = ({ isHamburgerMenuOpen, closeHamburger }) => {
    return (
        <div className={`bg-gray-800 sticky z-3 top-0 pt-10 md:hidden ${isHamburgerMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
                <NavLink to="/" onClick={closeHamburger} className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Home</NavLink>
                <NavLink to="/admin/users" onClick={closeHamburger} className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page"><img src={Info} className='w-[20px] h-[20px]' /> <span className="flex-1 ms-3 whitespace-nowrap">users</span></NavLink>
                <NavLink to="/admin/contacts" onClick={closeHamburger} className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page"><img src={person} className='w-[20px] h-[20[px]' /> <span className="flex-1 ms-3 whitespace-nowrap">Contact</span></NavLink>
                {/* Changed conClick to onClick */}
                <NavLink to="/admin/postdata" onClick={closeHamburger} className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page"><img src={person} className='w-[20px] h-[20[px]' /> <span className="flex-1 ms-3 whitespace-nowrap">Add Data</span></NavLink>
                <NavLink to="/admin/AdminProductData" onClick={closeHamburger} className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page"><img src={person} className='w-[20px] h-[20[px]' /> <span className="flex-1 ms-3 whitespace-nowrap">Product Data</span></NavLink>
                <NavLink to="/admin/AdminOrderData" onClick={closeHamburger} className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page"><img src={person} className='w-[20px] h-[20[px]' /> <span className="flex-1 ms-3 whitespace-nowrap">Product Data</span></NavLink>
            </div>
        </div>
    );
};

export const AdminLayout = () => {
    // Moved useState hooks to the top
    const { user, isLoading } = useAuth();
    const [isHamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

    const toggleHamburger = () => {
        console.log('Toggling hamburger menu');
        setHamburgerMenuOpen(!isHamburgerMenuOpen);
    };

    const closeHamburger = () => {
        console.log('Closing hamburger menu');
        setHamburgerMenuOpen(false);
    };

    if (isLoading) {
        return (
            <div className="w-screen h-screen flex align-middle justify-center items-center bg-white">
                <img src={Loading} alt="Loading" />
            </div>
        );
    }

    if (!user.isAdmin) {
        return <Navigate to="/" />;
    }

    console.log("admin layout", user);

    return (
        <>
            <nav className="mt-16 sticky z-3 bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        onClick={toggleHamburger}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                        aria-controls="navbar-default"
                        aria-expanded={isHamburgerMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`hidden w-full md:block md:w-auto`} id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" aria-current="page"><img src={HomePNG} className='w-[20px] h-[20px]' /> <span className="flex-1 ms-3 whitespace-nowrap">Home</span></NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/users" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" aria-current="page"><img src={Info} className='w-[20px] h-[20px]' /> <span className="flex-1 ms-3 whitespace-nowrap">users</span></NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/contacts" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" aria-current="page"><img src={person} className='w-[20px] h-[20[px]' /> <span className="flex-1 ms-3 whitespace-nowrap">Contact</span></NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/postdata" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" aria-current="page"><img src={person} className='w-[20px] h-[20[px]' /> <span className="flex-1 ms-3 whitespace-nowrap">Add Data</span></NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/AdminProductData" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" aria-current="page"><img src={person} className='w-[20px] h-[20[px]' /> <span className="flex-1 ms-3 whitespace-nowrap">Product Data</span></NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/AdminOrderData" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" aria-current="page"><img src={person} className='w-[20px] h-[20[px]' /> <span className="flex-1 ms-3 whitespace-nowrap">Order Data</span></NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <MobileMenu isHamburgerMenuOpen={isHamburgerMenuOpen} closeHamburger={closeHamburger} />
            <Outlet />
        </>
    );
};
