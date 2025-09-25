import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { tokenContext } from '../../Context/Context'
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
  let { token, setToken } = useContext(tokenContext)
  const {cart}=useContext(CartContext)
  let navigate = useNavigate()
  // console.log(token)

  const cartCount=cart?.products?.reduce((sum,item)=>sum+item.quantity,0)

  function logOut() {
    localStorage.removeItem("token")
    setToken(null)
    navigate("/register")
  }

  return (
    <>
      <div className="navbar bg-[#FFFFFF] px-6 w-full border-b border-gray-300">
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold text-black">
          <i className="fa-solid fa-basket-shopping text-red-600"></i>
            TrendyMart
          </Link>
        </div>


        <div className="hidden sm:flex flex-none">
          <ul className="menu menu-horizontal px-1 space-x-2 font-medium">
            {token && (
              <>
                <li><Link to="/" className="hover:text-red-600">Home</Link></li>
                <li><Link to="/products" className="hover:text-red-600">Products</Link></li>
                <li><Link to="/categories" className="hover:text-red-600">Categories</Link></li>
                
              </>
            )}

            {token
              ? <li><a onClick={logOut} className="hover:text-red-600">Logout</a></li>
              : <>
                <li><Link to="/login" className="hover:text-red-600">Login</Link></li>
                <li><Link to="/register" className="hover:text-red-600">Register</Link></li>
              </>
            }
          </ul>
        </div>

        {token? <div className="hidden lg:flex flex-1 justify-end items-center space-x-4">

              <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-facebook text-2xl hover:text-[#DB4444]"></i>
            </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-x-twitter text-2xl hover:text-[#DB4444]"></i>
              
            </a>
            <button className="text-gray-600 hover:text-red-500 transition">
          <Link to="/cart" ><i className="fa-solid fa-cart-shopping"></i>
            {cartCount>0&&(<span className="absolute top-1 -right- bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>)}
          </Link> 
          </button>
          <button className="text-gray-600 hover:text-red-500 transition">
            <Link to="/wishlist"><i className="fas fa-heart text-xl"></i></Link>
          </button>

        </div>:""}

        <div className="sm:hidden flex items-center">
          <details className="dropdown dropdown-end">
            <summary className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </summary>

            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 w-screen font-medium space-y-2">

              {token?<><div className="relative mb-3">
                      <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-facebook text-2xl hover:text-[#DB4444]"></i>
            </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-x-twitter text-2xl hover:text-[#DB4444]"></i>
              
            </a>
              </div>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/categories" className="hover:text-red-600">Categories</Link></li>
              </>:""}

              {token
                ? <li><a onClick={logOut} className="hover:text-red-600">Logout</a></li>
                : <>
                  <li><Link to="/login" className="hover:text-red-600">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              }

            
              {token?<div className="flex justify-around items-center mt-4">
                    <button className="text-gray-600 hover:text-red-500 transition">
            <Link to="/cart" ><i className="fa-solid fa-cart-shopping"></i></Link> 
          </button>
                <button className="text-gray-600 hover:text-red-500 transition">
                <Link to="/wishlist"> <i className="fas fa-heart text-xl"></i></Link> 
                </button>
              </div>:""}
            </ul>
          </details>
        </div>
      </div>
    </>
  )
}

