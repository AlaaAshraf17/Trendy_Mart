import React, { useContext } from 'react'
import styles from './FeaturedProducts.module.css'
import axios from 'axios' 
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';

export default function FeaturedProducts() {
  let { addToCart } = useContext(CartContext)
  async function addProduct(product) {
    let userId = 1
    addToCart(userId, product)
  }
  let { addToWishlist, inWishlist } = useContext(WishlistContext)

  function getFeaturedProducts() {
    return axios.get("https://dummyjson.com/products?limit=100")
  }
  let { data, isLoading } = useQuery({
    queryKey: ["featureProducts"],
    queryFn: getFeaturedProducts,
  })

  return (
    <div>
      <div className="container mx-auto">
        {isLoading && <Loader />}
        <div className="grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {data?.data.products.map((product) => (
            <div key={product.id} className="p-2">
              <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
                <button
                  onClick={() => addToWishlist(product)}
                  className="absolute top-3 right-3 z-10 text-xl"
                >
                  <i className={inWishlist(product.id) ? "fas fa-heart text-red-500" : "far fa-heart text-gray-400 dark:text-gray-500"} />
                </button>
                <Link to={`/singleproducts/${product.id}`}>
                  <img src={product.thumbnail} className="w-full h-48 object-cover rounded-t-xl" alt={product.title} />
                  <div className="p-3 flex flex-col flex-grow">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{product.category}</p>
                    <h2 className="font-semibold text-base truncate text-gray-900 dark:text-white">{product.title}</h2>
                    <div className="flex justify-between items-center mt-2 mb-3">
                      <p className="text-[#DB4444] font-bold">{product.price} EGP</p>
                      <p className="text-yellow-500 flex items-center gap-1 text-sm">
                        <i className="fa fa-star"></i> {product.rating}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="p-1">
                  <button
                    onClick={() => addProduct(product)}
                    className="bg-[#DB4444] hover:bg-red-600 text-white w-full py-2 rounded-lg font-medium
                    translate-y-2 opacity-0
                    group-hover:translate-y-0 group-hover:opacity-100
                    transition-[transform,opacity] duration-300 ease-out"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
