import React, { useContext,useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { ref } from 'yup';
import { CartContext } from '../../Context/CartContext';

export default function SingleProduct() {
    let {addToCart}=useContext(CartContext)
      async function addProduct(product){
      let userId=1
      addToCart(userId,product)
    }
  let { id } = useParams()
  const[singleItem,setSingleItem]=useState({})
  const[isloading,setIsloading]=useState(true)

  async function getItemDetails() {
    return await axios.get(`https://dummyjson.com/products/${id}`). 
    then((response)=>{
    console.log(response.data)
    setSingleItem(response.data)
    setIsloading(false)
    }).catch((error)=>{
      console.log(error)
      setIsloading(false)
    })
  }
  useEffect((()=>{
    getItemDetails()
  }),[id])

  // let { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["singleProduct", id],
  //   queryFn: itemDetails,
  // })

  // if (isLoading) return <Loader />
  // if (isError) return <div className="text-red-500 p-4">Error: {error.message}</div>

  let product = singleItem

  return (
  
     <div className="container mx-auto p-4">
      {isloading?<Loader/>:<div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md flex flex-col md:flex-row overflow-hidden">
        <img src={product.thumbnail} alt={product.title} className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"/>
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <p className="text-gray-500 text-sm mb-1">{product.category}</p>
            <h1 className="text-2xl font-semibold mb-2 text-black">{product.title}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-[#DB4444] font-bold text-xl">{product.price} EGP</p>
            <p className="text-yellow-500 flex items-center gap-1 text-sm">
              <i className="fa fa-star"></i> {product.rating}
            </p>
          </div>
          <button
            onClick={()=>{addProduct(product)}}
            className="bg-[#DB4444] text-white py-3 rounded-lg font-medium
            hover:bg-red-600 transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>}
      
    </div>
  )
}

