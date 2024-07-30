import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom'

export const MyCart = () => {
  const { cartItems, getTotalPrice, removeFromCart } = useCart();

  return (
    <div className="mt-24 w-screen h-screen mx-auto p-4">
      <h1 className="text-2xl font-bold px-4 mb-4">My Orders</h1>
      <table className="min-w-full  bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Image</th>
            <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Product</th>
            <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Price</th>
            <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Offer</th>
            <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b border-gray-200">
                <img src={item.urlToImage} className="w-14 h-10" alt={item.product} />
              </td>
              <td className="py-2 px-4 border-b border-gray-200">{item.product}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.price}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.offer}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right mr-4">
        <h2 className="text-xl font-bold">Total Price: {getTotalPrice().toFixed(2)}</h2>
        <Link to="/OrderRegister">
          <button
            className="mt-2 bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
          >
            Place Order
          </button>
        </Link>
      </div>
    </div>
  );
};


