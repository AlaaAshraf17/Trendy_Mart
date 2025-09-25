import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Categories.module.css';

export default function Categories() {

  const [categoryImages, setCategoryImages] = useState({});
  const navigate = useNavigate();

  function getCategories() {
    return axios.get('https://dummyjson.com/products/categories');
  }

  let { data } = useQuery({
    queryKey: ["catSlider"],
    queryFn: getCategories
  });

    useEffect(() => {
    if (data?.data) {
      data.data.forEach(cat => {
        axios.get(`https://dummyjson.com/products/category/${cat.slug}?limit=1`)
          .then((response) => {
            setCategoryImages(prev => ({...prev,[cat.slug]: response.data.products[0]?.thumbnail}));
          });
      });
    }
  }, [data]);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        Our Categories
      </h2>

      <div className="grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {data?.data?.map((cat, i) => (
          <div key={i} className="p-2">
            <div
              className="group bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              onClick={() => navigate(`/products?category=${cat.slug}`)}
            >
              <img
                src={categoryImages[typeof cat === "string" ? cat : cat.slug]}
                className="w-full h-48 object-cover rounded-t-xl"
                alt={cat}
              />

              <div className="p-3 flex flex-col flex-grow">
                <p className="text-gray-700 font-semibold capitalize">{cat.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

