import { useEffect, useState } from "react";
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';


export const UpdateData = () => {
    const { user, AuthorizationToken } = useAuth();
    const navigate = useNavigate();

    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });


    useEffect(() => {
        if (user) {
            setData({
                username: user.username,
                email: user.email,
                phone: user.phone
            });
        }
    }, [user]);

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/auth/updateUser`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: AuthorizationToken,
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                alert("Updated Successfully");
                navigate("/");
            } else {
                alert("Not Updated");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex align-middle justify-center items-center w-full">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Update User Data
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required name="username" value={data.username} onChange={handleInput} />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" value={data.email} onChange={handleInput} />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No.</label>
                            <input type="tel" name="phone" id="phone" placeholder="Phone Number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.phone} onChange={handleInput} />
                        </div>
                        <button type="submit" className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
