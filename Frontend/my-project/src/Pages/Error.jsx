import { NavLink } from "react-router-dom";

export const Error = () => {
    return (
        <>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                    <p className="text-2xl text-gray-600 mb-8">Page not found</p>
                    <div>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-4 hover:bg-blue-600"
                        >
                            <NavLink to="/">return home</NavLink>
                        </button>
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            <NavLink to="/contact">report problem</NavLink>
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}