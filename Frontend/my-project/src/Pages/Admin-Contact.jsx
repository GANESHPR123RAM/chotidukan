import { useEffect, useState } from "react"
import { useAuth } from '../store/auth'

export const AdminContact = () => {
    const [contacts, setContacts] = useState([]);

    const { AuthorizationToken } = useAuth();

    const getContactData = async () => {

        try {

            const response = await fetch("http://localhost:5000/api/admin/contacts", {
                method: 'GET',
                headers: {
                    Authorization: AuthorizationToken,
                },
            });

            const data = await response.json();
            console.log("user data ", data);
            setContacts(data);



        } catch (error) {
            console.log(error);
        }
    }




    const deleteContact = async (id) => {

        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: AuthorizationToken,
                },
            });

            const data = await response.json();
            console.log("Contact after delete ", data);

            if (response.ok) {
                getContactData();
            }
        } catch (error) {
            console.log(error);
        }

    }



    useEffect(() => {
        getContactData();
    }, [])

    return (
        <>

            <div className="relative min-h-screen overflow-x-auto">
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
                                message
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((curUser, index) => {
                            return (<tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {curUser.username}
                                </th>
                                <td className="px-6 py-4">
                                    {curUser.email}
                                </td>
                                <td className="px-6 py-4">
                                    {curUser.message}
                                </td>
                                <td className="px-6 py-4">
                                    <button type="button" onClick={() => deleteContact(curUser._id)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}