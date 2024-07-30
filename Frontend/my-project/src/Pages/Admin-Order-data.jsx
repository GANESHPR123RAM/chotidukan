import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';

export const AdminOrderData = () => {
    const { AuthorizationToken } = useAuth();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const getAllOrdersData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/order", {
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

            if (Array.isArray(data)) {
                setOrders(data);
            } else {
                throw new Error("Invalid data format");
            }
        } catch (error) {
            console.error("Fetching orders failed:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllOrdersData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="relative min-h-screen overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                       <th scope="col" className="px-6 py-3">User</th>
                       <th scope="col" className="px-6 py-3">Email</th>
                       <th scope="col" className="px-6 py-3">Phone</th>
                       <th scope="col" className="px-6 py-3">Country</th>
                       <th scope="col" className="px-6 py-3">Street Address</th>
                       <th scope="col" className="px-6 py-3">City</th>
                       <th scope="col" className="px-6 py-3">State</th>
                       <th scope="col" className="px-6 py-3">Pin Code</th>
                       <th scope="col" className="px-6 py-3">Image</th>
                       <th scope="col" className="px-6 py-3">Product</th>
                       <th scope="col" className="px-6 py-3">Price</th>
                       <th scope="col" className="px-6 py-3">Offer</th>
                       <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <React.Fragment key={index}>
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{order.username}</th>
                                <td className="px-6 py-4">{order.email}</td>
                                <td className="px-6 py-4">{order.phone}</td>
                                <td className="px-6 py-4">{order.country}</td>
                                <td className="px-6 py-4">{order.streetaddress}</td>
                                <td className="px-6 py-4">{order.city}</td>
                                <td className="px-6 py-4">{order.state}</td>
                                <td className="px-6 py-4">{order.pinCode}</td>
                                <td className="py-2 px-4 border-b border-gray-200" colSpan="5"></td>
                            </tr>
                            {order.items.map((item, itemIndex) => (
                                <tr key={`${index}-${itemIndex}`} className="bg-white border-b dark:bg-gray border-0">
                                    <td className="py-2 px-4 border-b border-gray-200" colSpan="8"></td>
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
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
