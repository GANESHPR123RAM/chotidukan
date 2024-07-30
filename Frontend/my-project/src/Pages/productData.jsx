import { useState, useEffect } from "react";
import { useAuth } from '../store/auth';
import trash from '../assets/trash.png';

export const AdminProductData = () => {
    const { services, AuthorizationToken } = useAuth();
    const [serviceList, setServiceList] = useState([]);

    // Update the serviceList state when services from useAuth changes
    useEffect(() => {
        if (Array.isArray(services)) {
            setServiceList(services);
        }
    }, [services]);

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/data/services/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: AuthorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete service');
            }

            const data = await response.json();
            console.log("Service after delete", data);

            // Update the serviceList state to remove the deleted item
            setServiceList(serviceList.filter(service => service._id !== id));

        } catch (error) {
            console.error(error);
            alert('Failed to delete service');
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 p-10">
                {Array.isArray(serviceList) && serviceList.map((e, index) => {
                    const { product, offer, price, urlToImage } = e;
                    return (
                        <div key={index} className="flex flex-col p-2 items-center m-3 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
                            <img className="object-cover w-full rounded-lg h-full md:w-48" src={urlToImage} alt={product} />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{product}</h5>
                                <div className='flex align-middle justify-between items-center gap-5'>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Price: {price}</p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Offer: {offer}</p>
                                </div>
                                <button type="button" onClick={() => deleteUser(e._id)} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center align-middle items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700">
                                    <img src={trash} className='w-[20px] h-[20px]' alt="Trash Icon" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
