import React, { useContext, useEffect, useState } from 'react'
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
  const [categories, setCategories] = useState([])
  useEffect(() => {
    axios.get("https://dummyjson.com/products/category-list")
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error))
  })

  let { addToCart } = useContext(CartContext)
  async function addProduct(product) {
    let userId = 1
    addToCart(userId, product)
  }

  let { addToWishlist, inWishlist } = useContext(WishlistContext)

  const [searchParams, setSearchParams] = useSearchParams()
  const categorie = searchParams.get("category")
  const brand = searchParams.get("brand")

  function getProductByCategorie() {
    return axios.get(`https://dummyjson.com/products/category/${categorie}`)
  }
  function getProductByBrand() {
    return axios.get("https://dummyjson.com/products")
  }

  let { data, isLoading } = useQuery({
    queryKey: ["products", categorie],
    queryFn: categorie ? getProductByCategorie : getProductByBrand,
    enabled: !!categorie || !!brand,
  })

  const CategoryFilters = () => (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => setSearchParams({})}
        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setSearchParams({ category: cat })}
          className={`px-3 py-1 border rounded-lg capitalize transition
            ${categorie === cat
              ? "bg-[#DB4444] text-white border-[#DB4444]"
              : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )

  const ProductCard = ({ product }) => (
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
  )

  if (categorie) {
    if (isLoading) return <Loader />
    return (
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6 capitalize text-gray-900 dark:text-white">
          Products in {categorie}
        </h2>
        <CategoryFilters />
        <div className="grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {data?.data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    )
  }

  if (brand) {
    if (isLoading) return <Loader />
    const brandProducts = data?.data.products.filter((p) => p.brand === brand)
    return (
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6 capitalize text-gray-900 dark:text-white">
          Products in {brand}
        </h2>
        <div className="grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {brandProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6">
      <CategoryFilters />
      <FeaturedProducts />
    </div>
  )
}
