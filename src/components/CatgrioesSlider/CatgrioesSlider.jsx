import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

export default function CategoriesSlider() {
  const location = useLocation();
  const sliderRef = useRef(null);
  const [categoryImages, setCategoryImages] = useState({});
  const [sliderKey, setSliderKey] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0);
        sliderRef.current.innerSlider?.onWindowResized();
      }
    };
    const timeouts = [
      setTimeout(handleResize, 100),
      setTimeout(handleResize, 300),
      setTimeout(handleResize, 500)
    ];

    setSliderKey(prev => prev + 1);

    window.addEventListener('resize', handleResize);

    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (sliderRef.current) {
        sliderRef.current.innerSlider?.onWindowResized();
      }
    }, 300);
   
    return () => clearTimeout(timeout);
  }, [categoryImages]);

  function getCategories() {
    return axios.get('https://dummyjson.com/products/categories');
  }

  let { data } = useQuery({
    queryKey: ["catSlider"],
    queryFn: getCategories
  });

  useEffect(() => {
    if (data?.data) {
      setCategoryImages({}); 
      data.data.forEach(cat => {
        axios.get(`https://dummyjson.com/products/category/${cat.slug}?limit=1`)
          .then((response) => {
            setCategoryImages(prev => ({
              ...prev,
              [cat.slug]: response.data.products[0]?.thumbnail
            }));
          })
          .catch(error => {
            console.error(`Error loading image for ${cat.slug}:`, error);
          });
      });
    }
  }, [data]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    adaptiveHeight: false, 
    variableWidth: false, 
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      }
    ]
  };

  if (!data?.data?.length || Object.keys(categoryImages).length === 0) {
    return (
      <div className="my-10 mt-10 w-full px-4">
        <h2 className="text-2xl font-bold mb-6 ml-8">Shop by Categories</h2>
        <div className="flex justify-center items-center h-32">
          {<Loader></Loader>}
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 mt-10 w-full px-4">
      <h2 className="text-2xl font-bold mb-6 ml-8">Shop by Categories</h2>
      <div key={`${location.pathname}-${sliderKey}`} className="categories-slider-wrapper">
        <Slider ref={sliderRef} {...settings}>
          {data?.data?.map((cat, i) => (
            <div key={`${cat.slug}-${i}`} className="px-2 sm:px-4">
              <div
                onClick={() => navigate(`/products?category=${cat.slug}`)}
                className="p-3 border rounded-xl bg-white shadow-sm text-center cursor-pointer transition-transform duration-300 hover:scale-95 hover:shadow-lg hover:border-gray-300 flex flex-col items-center justify-between w-full min-h-[160px]"
              >
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={categoryImages[cat.slug]}
                    alt={cat.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <h3 className="font-semibold capitalize text-gray-700 hover:text-gray-900 transition-colors text-xs sm:text-sm md:text-base truncate w-full mt-2"      style={{ 
                      minHeight: '2.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      wordBreak: 'break-word',
                      hyphens: 'auto'
                    }}>
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

