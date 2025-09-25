import React from 'react'
import styles from './Loader.module.css'
import { FadeLoader } from 'react-spinners'
export default function Loader() {
  return (
    <>
        <div className="flex justify-center items-center h-screen">
          <FadeLoader color="#DB4444" />
        </div>
    </>
  )
}
