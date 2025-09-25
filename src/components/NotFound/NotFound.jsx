import React from 'react'
import styles from './NotFound.module.css'
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-9xl font-extrabold text-red-600 mb-4">404</h1>
      <p className="text-2xl font-semibold text-red-700 mb-6">Page Not Found</p>
      <p className="text-gray-700 mb-8 max-w-md text-center">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <button className="btn btn-error btn-outline">
        <Link to="/">Go Home</Link>
      </button>
    </div>
    </div>
  )
}
