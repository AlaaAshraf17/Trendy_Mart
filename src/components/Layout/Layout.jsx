import React from 'react'
import styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar></Navbar>
      <main className="min-h-[calc(100vh-64px)]">
        <Outlet/>
      </main>
      <Footer></Footer>
    </div>
  )
}
