import { useState } from 'react';

export const AddData = () => {
    const [postdata, setPostdata] = useState({
        product: "",
        price: "",
        offer: "",
        urlToImage: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setPostdata({
            ...postdata,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/data/postdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(postdata)
            });

            if (response.ok) {
                setPostdata({
                    product: "",
                    price: "",
                    offer: "",
                    urlToImage: ""
                });
                alert("Your Data is saved")
            } else {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                alert("The same data is already saved");
                setPostdata({
                    product: "",
                    price: "",
                    offer: "",
                    urlToImage: ""
                });
            }
        } catch (error) {
            console.error("register error", error);
        }
    };

    return (
        <section>
            <div className="mt-16 flex items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
                <div className="flex align-middle justify-center items-center w-full">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Add Data
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product</label>
                                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product" required name="product" value={postdata.product} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                    <input type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price" required value={postdata.price} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="offer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Offer</label>
                                    <input type="text" name="offer" id="offer" placeholder="Offer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={postdata.offer} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="urlToImage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL to Image</label>
                                    <input type="text" name="urlToImage" id="urlToImage" placeholder="URL to Image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={postdata.urlToImage} onChange={handleInput} />
                                </div>
                                <button type="submit" className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Data</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
