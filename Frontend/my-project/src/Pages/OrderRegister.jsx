import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useCart } from './CartContext';

export const OrderRegister = () => {
  const { cartItems, getTotalPrice } = useCart();
  const [infoData, setInfoData] = useState({
    username: "",
    email: "",
    phone: "",
    country: "",
    streetaddress: "",
    city: "",
    state: "",
    pinCode: "",
    cartItems,
    totalPrice: getTotalPrice(),
  });

  const [userData, setUserData] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (userData && user) {
      setInfoData((prevInfoData) => ({
        ...prevInfoData,
        username: user.username,
        email: user.email,
        phone: user.phone,
      }));
      setUserData(false);
    }
  }, [userData, user]);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInfoData({
      ...infoData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/order/addToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(infoData),
      });

      if (response.ok) {
        alert("Order successfully placed");
        setInfoData({
          username: "",
          email: "",
          phone: "",
          country: "",
          streetaddress: "",
          city: "",
          state: "",
          pinCode: "",
          cartItems: [],
          totalPrice: 0,
        });
        navigate('/UserPanel');
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert('Failed to place order');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="mt-16 bg-gray-100">
      <div className="mx-auto py-8">
        <div className="w-screen grid align-middle justify-center items-center gap-6 px-4">
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                        <div className="mt-2">
                          <input type="text" id="username" name="username" placeholder="Name" value={infoData.username} onChange={handleInput} autoComplete="given-name" className="px-3 py-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone no.</label>
                        <div className="mt-2">
                          <input type="tel" name="phone" id="phone" placeholder="Phone Number" required value={infoData.phone} onChange={handleInput} autoComplete="family-name" className="px-3 py-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                          <input id="email" name="email" placeholder="Email" value={infoData.email} onChange={handleInput} type="email" autoComplete="email" className="px-3 py-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label htmlFor="country" className="px-3 py-1 block text-sm font-medium leading-6 text-gray-900">Country</label>
                        <div className="mt-2">
                          <input type="text" id="country" name="country" value={infoData.country} onChange={handleInput} placeholder="Country" autoComplete="given-name" className="px-3 py-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label htmlFor="streetaddress" className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                        <div className="mt-2">
                          <input type="text" name="streetaddress" value={infoData.streetaddress} onChange={handleInput} id="streetaddress" autoComplete="street-address" className="px-3 py-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                        <div className="mt-2">
                          <input type="text" name="city" value={infoData.city} onChange={handleInput} id="city" autoComplete="address-level2" className="px-3 py-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                        <div className="mt-2">
                          <input type="text" name="state" value={infoData.state} onChange={handleInput} id="state" autoComplete="address-level1" className="px-3 py-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                        <div className="mt-2">
                          <input type="text" name="pinCode" value={infoData.pinCode} onChange={handleInput} id="pinCode" autoComplete="postal-code" className="px-3 py-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Order</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
