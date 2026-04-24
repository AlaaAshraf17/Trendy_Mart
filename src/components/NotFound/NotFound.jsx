import React from 'react'
import styles from './NotFound.module.css'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-950 px-4">
        <h1 className="text-9xl font-extrabold text-red-600 mb-4">404</h1>
        <p className="text-2xl font-semibold text-red-700 dark:text-red-400 mb-6">Page Not Found</p>
        <p className="text-gray-700 dark:text-gray-400 mb-8 max-w-md text-center">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 border-2 border-red-600 text-red-600 dark:text-red-400 dark:border-red-400 rounded-lg hover:bg-red-600 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition font-semibold"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
