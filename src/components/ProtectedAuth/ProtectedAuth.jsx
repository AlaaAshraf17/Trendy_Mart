import React from 'react'
import styles from './ProtectedAuth.module.css'
import { Navigate } from 'react-router-dom'
export default function ProtectedAuth(props) {
  if(localStorage.getItem("token")){
    return <Navigate to="/"/>
  }
  else{
    return props.children
  }
  return (
    <div>
      
    </div>
  )
}
