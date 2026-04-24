import React from 'react'
import styles from './Footer.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 border-t border-gray-200 dark:border-gray-700 mt-20">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Services */}
          <div>
            <h6 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Services</h6>
            <ul className="space-y-2">
              <li><Link to="/branding" className="hover:text-[#DB4444]">Branding</Link></li>
              <li><Link to="/design" className="hover:text-[#DB4444]">Design</Link></li>
              <li><Link to="/marketing" className="hover:text-[#DB4444]">Marketing</Link></li>
              <li><Link to="/advertisement" className="hover:text-[#DB4444]">Advertisement</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h6 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Company</h6>
            <ul className="space-y-2">
              <li><Link to="/aboutus" className="hover:text-[#DB4444]">About Us</Link></li>
              <li><Link to="/contactus" className="hover:text-[#DB4444]">Contact</Link></li>
              <li><Link to="/jobs" className="hover:text-[#DB4444]">Jobs</Link></li>
              <li><Link to="/press" className="hover:text-[#DB4444]">Press Kit</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h6 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Social</h6>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-x-twitter text-2xl hover:text-[#DB4444]"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-youtube text-2xl hover:text-[#DB4444]"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-facebook text-2xl hover:text-[#DB4444]"></i>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="sm:col-span-2 md:col-span-1 flex items-end">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} TrendyMart. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
