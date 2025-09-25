import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  return (
    <div className=" container mx-auto mt-10 px-4">
      <div className='hidden md:block overflow-x-auto'>
      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="p-4"></th>
            <th className="text-left text-gray-600 uppercase text-xs font-semibold p-4">Product</th>
            <th className="text-left text-gray-600 uppercase text-xs font-semibold p-4">Price</th>
            <th className="text-left text-gray-600 uppercase text-xs font-semibold p-4">Quantity</th>
            <th className="text-left text-gray-600 uppercase text-xs font-semibold p-4">Total</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>

          {cart?.products?.map((item, i) => (
            <tr
              key={i}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="p-4">
                <div className="avatar">
                  <div className="mask mask-squircle h-16 w-16 overflow-hidden rounded-lg shadow-sm">
                    <img src={item.thumbnail} alt={item.title} className="object-cover w-full h-full" />
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div>
                  <div className="font-semibold text-gray-800 text-base">{item.title}</div>
                  <div className="text-xs text-gray-400 mt-1">{item.category}</div>
                </div>
              </td>
              <td className="p-4 font-medium text-gray-700">{item.price} EGP</td>
              <td className="p-4">
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  className="input input-bordered w-20 rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                />
              </td>
              <td className="p-4 font-bold text-gray-900">
                {(item.price * item.quantity).toFixed(2)} EGP
              </td>
              <td className="p-4">
                <button
                  className="btn btn-error btn-xs bg-red-600 hover:bg-red-700 text-white rounded-md px-3 py-1 transition"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100">
            <td colSpan={4} className="text-right font-bold text-lg p-4 text-gray-800">
              Grand Total:
            </td>
            <td className="font-extrabold text-[#DB4444] text-lg p-4">
              {cart?.products?.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}{" "}EGP
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      </div>

       <div className='md:hidden space-y-4'>
        {cart?.products?.map((item,i)=>(
          <div key={i} className='bg-white rounded-lg shadow-md p-4 border border-gray-200'>
            <div className='flex items-start space-x-4'>
              <div className='flex-shrink-0'>
                <div className='w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-lg shadow-sm'>
                  <img src={item.thumbnail} alt={item.title}  className="object-cover w-full h-full" />
                </div>
              </div>

              <div className='flex-1 min-w-0'>
                <div className="font-semibold text-gray-800 text-base mb-1 line-clamp-2">
                  {item.title}
                </div>
                <div className="text-xs text-gray-400 mb-3 capitalize">{item.category}</div>
                <div className='space-y-2 text-sm'>
                    <div className="flex justify-between items-center">
                    <span className="text-gray-500">Price:</span>
                    <span className="font-medium text-gray-700">{item.price} EGP</span>
                  </div>
                    <div className="flex justify-between items-center">
                    <span className="text-gray-500">Quantity:</span>
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition text-center"
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                    />
                  </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-gray-500 font-medium">Subtotal:</span>
                    <span className="font-bold text-gray-900">
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
        <div className='bg-gray-50 rounded-lg p-4 border border-gray-200 sticky bottom-4'>
        <div className='flex justify-between items-center'>
          <span className="font-bold text-lg text-gray-800">Grand Total:</span>
            <span className="font-extrabold text-[#DB4444] text-xl">
             {cart?.products?.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}{" "}EGP
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
    </div>
  );
}