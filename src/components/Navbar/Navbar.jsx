import React, { useContext } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { tokenContext } from '../../Context/Context'
import { CartContext } from '../../Context/CartContext';
import { useTheme } from '../../Context/ThemeContext';

export default function Navbar() {
  let { token, setToken } = useContext(tokenContext)
  const { cart } = useContext(CartContext)
  const { isDark, toggleTheme } = useTheme()
  let navigate = useNavigate()

  const cartCount = cart?.products?.reduce((sum, item) => sum + item.quantity, 0)

  function logOut() {
    localStorage.removeItem("token")
    setToken(null)
    navigate("/register")
  }

  const navLinksClass = ({ isActive }) => {
    return isActive
      ? "bg-red-600 text-white px-3 py-2 rounded"
      : "hover:text-red-600 dark:text-gray-200 dark:hover:text-red-400"
  }

  return (
    <>
      <div className="navbar bg-white dark:bg-gray-900 px-6 w-full border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        {/* Logo */}
        <div className="flex-1">
          <NavLink to="/" className="text-2xl font-bold text-black dark:text-white">
            <i className="fa-solid fa-basket-shopping text-red-600 mr-1"></i>
            TrendyMart
          </NavLink>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden sm:flex flex-none">
          <ul className="menu menu-horizontal px-1 space-x-2 font-medium">
            {token && (
              <>
                <li><NavLink to="/" className={navLinksClass}>Home</NavLink></li>
                <li><NavLink to="/products" className={navLinksClass}>Products</NavLink></li>
                <li><NavLink to="/categories" className={navLinksClass}>Categories</NavLink></li>
              </>
            )}

            {token
              ? <li><a onClick={logOut} className="hover:text-red-600 dark:text-gray-200 dark:hover:text-red-400 cursor-pointer">Logout</a></li>
              : <>
                <li><NavLink to="/login" className={navLinksClass}>Login</NavLink></li>
                <li><NavLink to="/register" className={navLinksClass}>Register</NavLink></li>
              </>
            }
          </ul>
        </div>

        {/* Desktop Right Icons */}
        {token && (
          <div className="hidden lg:flex flex-1 justify-end items-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-facebook text-2xl text-gray-700 dark:text-gray-300 hover:text-[#DB4444] dark:hover:text-[#DB4444]"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-x-twitter text-2xl text-gray-700 dark:text-gray-300 hover:text-[#DB4444] dark:hover:text-[#DB4444]"></i>
            </a>
            <div className="relative">
              <NavLink to="/cart" className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition">
                <i className="fa-solid fa-cart-shopping text-xl"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </div>
            <NavLink to="/wishlist" className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition">
              <i className="fas fa-heart text-xl"></i>
            </NavLink>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDark
                ? <i className="fa-solid fa-sun text-yellow-400 text-lg"></i>
                : <i className="fa-solid fa-moon text-gray-600 text-lg"></i>
              }
            </button>
          </div>
        )}

        {/* If not logged in, show dark mode toggle on right */}
        {!token && (
          <div className="hidden lg:flex items-center ml-4">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDark
                ? <i className="fa-solid fa-sun text-yellow-400 text-lg"></i>
                : <i className="fa-solid fa-moon text-gray-600 text-lg"></i>
              }
            </button>
          </div>
        )}

        {/* Mobile Hamburger */}
        <div className="sm:hidden flex items-center gap-2">
          {/* Mobile dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {isDark
              ? <i className="fa-solid fa-sun text-yellow-400"></i>
              : <i className="fa-solid fa-moon text-gray-600"></i>
            }
          </button>

          <details className="dropdown dropdown-end">
            <summary className="btn btn-ghost dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </summary>

            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-white dark:bg-gray-800 w-screen font-medium space-y-2">
              {token && (
                <>
                  <div className="flex gap-4 mb-3">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-facebook text-2xl text-gray-700 dark:text-gray-300 hover:text-[#DB4444]"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-x-twitter text-2xl text-gray-700 dark:text-gray-300 hover:text-[#DB4444]"></i>
                    </a>
                  </div>
                  <li><NavLink to="/" className="dark:text-gray-200 hover:text-red-600">Home</NavLink></li>
                  <li><NavLink to="/products" className="dark:text-gray-200 hover:text-red-600">Products</NavLink></li>
                  <li><NavLink to="/categories" className="dark:text-gray-200 hover:text-red-600">Categories</NavLink></li>
                </>
              )}

              {token
                ? <li><a onClick={logOut} className="hover:text-red-600 dark:text-gray-200 cursor-pointer">Logout</a></li>
                : <>
                  <li><NavLink to="/login" className="dark:text-gray-200 hover:text-red-600">Login</NavLink></li>
                  <li><NavLink to="/register" className="dark:text-gray-200">Register</NavLink></li>
                </>
              }

              {token && (
                <div className="flex justify-around items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="relative">
                    <NavLink to="/cart" className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition">
                      <i className="fa-solid fa-cart-shopping text-xl"></i>
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </NavLink>
                  </div>
                  <NavLink to="/wishlist" className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition">
                    <i className="fas fa-heart text-xl"></i>
                  </NavLink>
                </div>
              )}
            </ul>
          </details>
        </div>
      </div>
    </>
  )
}
