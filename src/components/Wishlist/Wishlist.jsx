import React, { useContext } from 'react';
import styles from './Wishlist.module.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';

export default function Wishlist() {
  const { wishlist, addToWishlist } = useContext(WishlistContext);
  let { addToCart } = useContext(CartContext);

  async function addProduct(product) {
    let userId = 1;
    addToCart(userId, product);
  }

  return (
    <>
      <div className="container mx-auto mt-10 px-4">
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4"></th>
                <th className="text-left text-gray-600 uppercase text-xs font-semibold p-4">Product</th>
                <th className="text-left text-gray-600 uppercase text-xs font-semibold p-4">Price</th>
                <th className="text-left text-gray-600 uppercase text-xs font-semibold p-4">Category</th>
                <th className="text-left text-gray-600 uppercase text-xs font-semibold p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {wishlist?.length > 0 ? (
                wishlist.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="p-4">
                      <div className="avatar">
                        <div className="mask mask-squircle h-16 w-16 overflow-hidden rounded-lg shadow-sm">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-semibold text-gray-800 text-base">{item.title}</div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-700">{item.price} EGP</td>
                    <td className="p-4 text-sm text-gray-500 capitalize">{item.category}</td>
                    <td className="p-4">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          className="bg-[#DB4444] hover:bg-[#cb4b4b] text-white px-4 py-2 rounded-md shadow-md transition text-sm whitespace-nowrap"
                          onClick={() => { addProduct(item) }}
                        >
                          Add to Cart
                        </button>
                        <button
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md transition text-sm"
                          onClick={() => addToWishlist(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-gray-500">
                    Your wishlist is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {wishlist?.length > 0 ? (
            wishlist.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-lg shadow-sm">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 text-base mb-2 line-clamp-2">
                      {item.title}
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Price:</span>
                        <span className="font-medium text-gray-700">{item.price} EGP</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Category:</span>
                        <span className="text-gray-600 capitalize">{item.category}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <button
                        className="bg-[#DB4444] hover:bg-[#cb4b4b] text-white px-4 py-2 rounded-md shadow-md transition text-sm flex-1 sm:flex-none"
                        onClick={() => { addProduct(item) }}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md transition text-sm flex-1 sm:flex-none"
                        onClick={() => addToWishlist(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-500 text-lg mb-4">Your wishlist is empty</div>
              <Link
                to="/products"
                className="inline-block bg-[#DB4444] hover:bg-[#cb4b4b] text-white px-6 py-2 rounded-md transition"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        {wishlist?.length > 0 && (
          <div className="flex justify-center md:justify-end mt-6">
            <Link
              to="/cart"
              className="bg-[#DB4444] hover:bg-[#cb4b4b] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 w-full md:w-auto text-center"
            >
              Go to Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
