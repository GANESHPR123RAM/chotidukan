import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { Link } from 'react-router-dom';
import unknown from '../assets/Unknown_person.jpg'

export const UserPanel = () => {
    const { AuthorizationToken, user } = useAuth(); // Destructured user
    const [myOrder, setMyOrder] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [infoData, setInfoData] = useState({
        username: "",
        email: "",
        phone: ""
    });
    const [userData, setUserData] = useState(true);

    // Use effect to update user information
    useEffect(() => {
        if (userData && user) {
            setInfoData({
                username: user.username,
                email: user.email,
                phone: user.phone
            });
            setUserData(false);
        }
    }, [user, userData]); // Added dependencies

    // Fetch order data
    const getOrdersData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/order/orders", {
                method: 'GET',
                headers: {
                    Authorization: AuthorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("order data", data);

            if (Array.isArray(data.orderData)) { // Changed to access orderData
                setMyOrder(data.orderData); // Changed to set data correctly
            } else {
                throw new Error("Invalid data format");
            }
        } catch (error) {
            console.error("Fetching orders failed:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch orders on component mount
    useEffect(() => {
        getOrdersData();
    }, [AuthorizationToken]); // Added dependency

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="mt-16 bg-gray-100">
                <div className="mx-auto py-8">
                    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                        <div className="col-span-4 sm:col-span-3">
                            <div className="bg-white shadow rounded-lg p-6">
                                <div className="flex flex-col items-center">
                                  
                                    <img src={unknown} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" alt="Profile" />
                                   <input type='file' name='file'/>
                                    <h1 className="text-xl font-bold">{infoData.username}</h1>
                                    <p className="text-gray-600">{infoData.email}</p>
                                    <p className="text-gray-600">{infoData.phone}</p>
                                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                        <Link to='/updateData'>
                                            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Update</button>
                                        </Link>
                                    </div>
                                </div>
                                <hr className="my-6 border-t border-gray-300" />
                                <div className="flex flex-col">
                                    <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Details</span>
                                    <h1 className=" text-gray-700 uppercase font-bold tracking-wider text-sm mb-1">Address-</h1>
                                    {myOrder.length > 0 && (
                                        <h1>
                                            {myOrder[0].streetaddress}, {myOrder[0].city}, {myOrder[0].pinCode}, {myOrder[0].state}, {myOrder[0].country}
                                        </h1>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 sm:col-span-9 bg-white shadow rounded-lg p-6">
                            <h1 className="text-center text-5xl font-bold">My Order</h1>
                            <div className="relative min-h-screen overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right mt-10 text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Image</th>
                                            <th scope="col" className="px-6 py-3">Product</th>
                                            <th scope="col" className="px-6 py-3">Price</th>
                                            <th scope="col" className="px-6 py-3">Offer</th>
                                            <th scope="col" className="px-6 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myOrder.map((order, index) => (
                                            order.items.map((item, itemIndex) => (
                                                <tr key={`${index}-${itemIndex}`} className="bg-white border-b dark:bg-gray border-0">
                                                    <td className="px-6 py-4">
                                                        <img src={item.urlToImage} className="w-14 h-10" alt={item.product} />
                                                    </td>
                                                    <td className="px-6 py-4">{item.product}</td>
                                                    <td className="px-6 py-4">{item.price}</td>
                                                    <td className="px-6 py-4">{item.offer}</td>
                                                    <td className="px-6 py-4">
                                                        {/* Actions */}
                                                    </td>
                                                </tr>
                                            ))
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
