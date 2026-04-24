import React, { useContext } from 'react'
import styles from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  return (
    <div className="container mx-auto mt-10 px-4">
      {cart?.products?.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="p-4"></th>
                  <th className="text-left text-gray-600 dark:text-gray-300 uppercase text-xs font-semibold p-4">Product</th>
                  <th className="text-left text-gray-600 dark:text-gray-300 uppercase text-xs font-semibold p-4">Price</th>
                  <th className="text-left text-gray-600 dark:text-gray-300 uppercase text-xs font-semibold p-4">Quantity</th>
                  <th className="text-left text-gray-600 dark:text-gray-300 uppercase text-xs font-semibold p-4">Total</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {cart?.products?.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
                  >
                    <td className="p-4">
                      <div className="avatar">
                        <div className="mask mask-squircle h-16 w-16 overflow-hidden rounded-lg shadow-sm">
                          <img src={item.thumbnail} alt={item.title} className="object-cover w-full h-full" />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-800 dark:text-white text-base">{item.title}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.category}</div>
                    </td>
                    <td className="p-4 font-medium text-gray-700 dark:text-gray-300">{item.price} EGP</td>
                    <td className="p-4">
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#DB4444] focus:border-[#DB4444] transition text-center"
                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                      />
                    </td>
                    <td className="p-4 font-bold text-gray-900 dark:text-white">
                      {(item.price * item.quantity).toFixed(2)} EGP
                    </td>
                    <td className="p-4">
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white rounded-md px-3 py-1 text-sm transition"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <td colSpan={4} className="text-right font-bold text-lg p-4 text-gray-800 dark:text-white">
                    Grand Total:
                  </td>
                  <td className="font-extrabold text-[#DB4444] text-lg p-4">
                    {cart?.products?.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} EGP
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {cart?.products?.map((item, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-lg shadow-sm">
                      <img src={item.thumbnail} alt={item.title} className="object-cover w-full h-full" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 dark:text-white text-base mb-1 line-clamp-2">{item.title}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mb-3 capitalize">{item.category}</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-gray-400">Price:</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{item.price} EGP</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-gray-400">Quantity:</span>
                        <input
                          type="number"
                          value={item.quantity}
                          min={1}
                          className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#DB4444] transition text-center"
                          onChange={(e) => updateQuantity(item.id, e.target.value)}
                        />
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-600">
                        <span className="text-gray-500 dark:text-gray-400 font-medium">Subtotal:</span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {(item.price * item.quantity).toFixed(2)} EGP
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition text-sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 sticky bottom-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-gray-800 dark:text-white">Grand Total:</span>
                <span className="font-extrabold text-[#DB4444] text-xl">
                  {cart?.products?.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} EGP
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end mt-6">
            <button
              className="bg-[#DB4444] hover:bg-[#cb4b4b] text-white font-semibold py-3 px-6 rounded-lg md:w-auto shadow-md transition duration-300"
              type="button"
            >
              <Link to="/payment">Checkout</Link>
            </button>
          </div>
        </>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center border border-gray-100 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">Your cart is empty</p>
          <Link
            to="/"
            className="inline-block bg-[#DB4444] hover:bg-[#cb4b4b] text-white px-6 py-2 rounded-md transition"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
