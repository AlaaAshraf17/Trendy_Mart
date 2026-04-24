import CatgrioesSlider from '../CatgrioesSlider/CatgrioesSlider'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './Home.module.css'
import React, { useContext, useState} from 'react'
import axios from 'axios' 
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import { brandImages } from '../../brandImages';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate()
  
  let { addToCart } = useContext(CartContext)
  async function addProduct(product) {
    let userId = 1
    addToCart(userId, product)
  }
  let { wishlist, addToWishlist, inWishlist } = useContext(WishlistContext)

  function getFeaturedProducts() {
    return axios.get("https://dummyjson.com/products")
  }
  let { data, isLoading } = useQuery({
    queryKey: ["featureProducts"],
    queryFn: getFeaturedProducts,
  })
  const productsTest = data?.data.products || []

  const brands = [...new Set(productsTest.slice(0, 8).map((p) => p.brand))]

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    dotsClass: "slick-dots custom-dots"
  };

  const images = [
    "/g1.jpg",
    "/beuty.png",
    "/beuty2.png",
    "/g3.jpg"
  ];

  const ProductCard = ({ product, showDiscount = false }) => (
    <div key={product.id} className="p-2">
      <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
        <button
          onClick={() => addToWishlist(product)}
          className="absolute top-3 right-3 z-10 text-xl"
        >
          <i className={inWishlist(product.id) ? "fas fa-heart text-red-500" : "far fa-heart text-gray-400 dark:text-gray-500"} />
        </button>
        <Link to={`/singleproducts/${product.id}`}>
          <img
            src={product.thumbnail}
            className="w-full h-48 object-cover rounded-t-xl"
            alt={product.title}
          />
          <div className="p-3 flex flex-col flex-grow">
            <p className="text-gray-500 dark:text-gray-400 text-sm">{product.category}</p>
            <h2 className="font-semibold text-base truncate text-gray-900 dark:text-white">{product.title}</h2>
            <div className="flex justify-between items-center mt-2 mb-3">
              <div>
                <p className="text-[#DB4444] font-bold">{product.price} EGP</p>
                {showDiscount && (
                  <span className="text-gray-400 dark:text-gray-500 line-through text-sm">
                    {Math.round(product.price * (100 + product.discountPercentage) / 100)} EGP
                  </span>
                )}
              </div>
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

  return (
    <>
      {/* Hero Section */}
      <div className={`max-w-[100%] mx-auto my-8 p-6 bg-white dark:bg-gray-900 shadow-lg flex flex-col lg:flex-row gap-6 ${styles.fadeIn}`}>
        <div className="w-full lg:w-1/3 flex flex-col justify-center lg:text-left">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white ${styles.slideUp}`}>
            Welcome to TrendyMart
          </h2>
          <p className={`text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base ${styles.fadeInDelay}`}>
            Discover the best products at unbeatable prices. We offer a wide range of categories to suit all your needs. Shop with confidence and enjoy fast delivery and excellent customer service.
          </p>
        </div>

        <div className="w-full lg:w-2/3">
          <Slider {...settings}>
            {images.map((src, index) => (
              <div key={index} className="flex justify-center items-center">
                <img
                  src={src}
                  alt={`slide-${index}`}
                  className={`rounded-lg shadow-md object-cover w-full h-60 md:h-80 lg:h-96 ${styles.zoomIn}`}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <CatgrioesSlider />

      {/* Best Sellers */}
      <h2 className="text-2xl font-bold mt-12 mb-6 ml-5 text-gray-900 dark:text-white">Best Sellers</h2>
      <div className="container mx-auto">
        {isLoading && <Loader />}
        <div className="grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {data?.data.products.filter(p => p.rating > 4.0).slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Shop by Brands */}
      <h2 className="text-2xl font-bold mt-12 mb-6 ml-5 text-gray-900 dark:text-white">Shop by Brands</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {brands.map((brand, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/products?brand=${brand}`)}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-center cursor-pointer hover:shadow-lg transition border border-transparent dark:border-gray-700"
          >
            <img
              src={brandImages[brand]}
              alt={brand}
              className="w-24 h-24 object-contain mx-auto mb-3"
            />
            <p className="font-semibold text-gray-900 dark:text-white">{brand}</p>
          </div>
        ))}
      </div>

      {/* Mega Deals */}
      <h2 className="text-2xl font-bold mt-12 mb-6 ml-5 text-gray-900 dark:text-white">Mega Deals</h2>
      <div className="container mx-auto">
        {isLoading && <Loader />}
        <div className="grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {data?.data.products.filter(p => p.discountPercentage > 13).slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} showDiscount={true} />
          ))}
        </div>
      </div>
    </>
  )
}
