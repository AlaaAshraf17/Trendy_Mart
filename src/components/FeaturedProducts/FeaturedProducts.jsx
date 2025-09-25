import React, { useContext, useEffect, useState } from 'react'
import styles from './FeaturedProducts.module.css'
import axios from 'axios' 
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
export default function FeaturedProducts() {
  let {addToCart}=useContext(CartContext)
    async function addProduct(product){
    let userId=1
    addToCart(userId,product)
  }
  let {wishlist,addToWishlist,inWishlist}=useContext(WishlistContext)

  function getFeaturedProducts(){
    return axios.get("https://dummyjson.com/products?limit=100")
  }
  let{data,isLoading,isError,isFetching}=useQuery({
    queryKey:["featureProducts"],
    queryFn:getFeaturedProducts,
    // staleTime:3000,
    // refetchInterval:4000
  })
  console.log(isLoading,"isLoading")
  console.log(data)


return (
  <div>
    <div className="container mx-auto">
      {isLoading? (
      <Loader/>
      )
      :""} 
      <div className="grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {data?.data.products.map((product) => (
          <div key={product.id} className=" p-2">
            <div className="group bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between overflow-hidden">
   <button
  onClick={(e) => {addToWishlist(product); }}className="absolute top-3 right-3  text-xl">
  <i
    className={inWishlist(product.id)? "fas fa-heart text-red-500": "far fa-heart text-gray-500"
    }
  />
</button>

                <Link to={`/singleproducts/${product.id}`}>
                <img src={product.thumbnail} className="w-full h-48 object-cover rounded-t-xl" alt={product.title}/>

              <div className="p-3 flex flex-col flex-grow">
                <p className="text-gray-500 text-sm">{product.category}</p>
                <h2 className="font-semibold text-base truncate text-black">{product.title}</h2>
                
                <div className="flex justify-between items-center mt-2 mb-3">
                  <p className="text-[#DB4444] font-bold">{product.price} EGP</p>
                  <p className="text-yellow-500 flex items-center gap-1 text-sm">
                    <i className="fa fa-star"></i> {product.rating}
                  </p>
                </div>
                </div>
                </Link>
                <div className="p-1 flex flex-col flex-grow">
                <button
                onClick={()=>{addProduct(product)}}
                  className="bg-[#DB4444] text-white w-full py-2 rounded-lg font-medium
                  opacity-0 translate-y-5 
                  group-hover:opacity-100 group-hover:translate-y-0
                  transition-all duration-300 ease-out">
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
