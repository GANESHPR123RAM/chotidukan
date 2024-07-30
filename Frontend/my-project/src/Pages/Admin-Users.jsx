import { useEffect, useState } from "react"
import { useAuth } from '../store/auth'
import { Link } from 'react-router-dom'


export const AdminUsers = () => {

    const [users, setUser] = useState([]);

    const { AuthorizationToken } = useAuth();

    const getAlluserData = async () => {

        try {

            const response = await fetch("http://localhost:5000/api/admin/users", {
                method: 'GET',
                headers: {
                    Authorization: AuthorizationToken,
                },
            });

            const data = await response.json();
            console.log("user data ", data);
            setUser(data);



        } catch (error) {
            console.log(error);
        }
    }


    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: AuthorizationToken,
                },
            });

            const data = await response.json();
            console.log("user after delete ", data);

            if (response.ok) {
                getAlluserData();
            }
        } catch (error) {
            console.log(error);
        }

    }




    useEffect(() => {
        getAlluserData();
    }, [])

    return (
        <>

            <div className=" min-h-screen relative w-full mt-24 overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                UserName
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((curUser, index) => {
                            return (<tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {curUser.username}
                                </th>
                                <td className="px-6 py-4">
                                    {curUser.email}
                                </td>
                                <td className="px-6 py-4">
                                    {curUser.phone}
                                </td>
                                <td className="px-6 py-4">
                                    <Link to={`/admin/users/${curUser._id}/edit`}>
                                        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit</button>
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                    <button type="button" onClick={() => deleteUser(curUser._id)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>



        </>
    )
}