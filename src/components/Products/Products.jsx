import React, {useContext, useEffect, useState} from 'react'
import styles from './Products.module.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Loader from '../Loader/Loader'
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom'
import { WishlistContext } from '../../Context/WishlistContext';
export default function Products() {
  const[categories, setCategories]=useState([])
  useEffect(()=>{
    axios.get("https://dummyjson.com/products/category-list").
    then((response)=>{setCategories(response.data)}).
    catch((error)=>{console.log(error)})
  })

    let {addToCart}=useContext(CartContext)
      async function addProduct(product){
      let userId=1
      addToCart(userId,product)
    }
    

  let {wishlist,addToWishlist,inWishlist}=useContext(WishlistContext)


  const[searchParams, setSearchParams]=useSearchParams()
  const categorie=searchParams.get("category")
  const brand= searchParams.get("brand")

  function getProductByCategorie(){
  return axios.get(`https://dummyjson.com/products/category/${categorie}`)
  }
  function getProductByBrand(){
    return axios.get("https://dummyjson.com/products")
  }


  let {data,isLoading}=useQuery({
    queryKey:["products",categorie],
    queryFn:categorie?getProductByCategorie : getProductByBrand,
    enabled:!!categorie || !!brand,

  })
  if(categorie){
    if(isLoading){
      return <Loader/>
    }
    return(
      <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6 capitalize">
          Products in {categorie}
        </h2>

        <div className="flex flex-wrap gap-2 mb-6">
  <button 
    onClick={() => setSearchParams({})} 
    className="px-3 py-1 border rounded-lg hover:bg-gray-100"
  >
    All
  </button>
  {categories.map(cat => (
    <button
      key={cat}
      onClick={() => setSearchParams({ category: cat })}
      className={`px-3 py-1 border rounded-lg hover:bg-gray-100 capitalize
        ${categorie === cat ? "bg-[#DB4444] text-white" : ""}`}
    >
      {cat}
    </button>
  ))}
</div>

      <div className="grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 ">
        {data?.data.products.map((product) => (
          <div key={product.id} className="p-2">
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
    )
  }


  if(brand){
    if(isLoading){
      return <Loader/>
    }
    const brandProducts = data?.data.products.filter((p)=>{
      return p.brand===brand
    })
    return(
          <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        Products in {brand}
      </h2>
      <div className="grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 ">
        {brandProducts.map((product) => (
          <div key={product.id} className="p-2">
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

    )

  }
  return (<>
    <div className="flex flex-wrap gap-2 mb-6">
  <button onClick={() => setSearchParams({})} className="px-3 py-1 border rounded-lg hover:bg-gray-100">
    All
  </button>
  {categories.map(cat => (
    <button key={cat}
      onClick={() => setSearchParams({ category: cat })}
      className={`px-3 py-1 border rounded-lg hover:bg-gray-100 capitalize
        ${categorie === cat ? "bg-[#DB4444] text-white" : ""}`}>
      {cat}
    </button>
  ))}
</div>
  <FeaturedProducts/>
  </>)
}
