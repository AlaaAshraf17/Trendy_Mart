import React, { useContext, useState } from 'react'
import styles from "./Login.module.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useFormik } from "formik"
import * as Yup from 'yup';
import { tokenContext } from '../../Context/Context';

export default function Login() {
  let {token,setToken}=useContext(tokenContext)
  const[userMessage,setUserMessage]=useState()
  const[errorMessage,setErrorMessage]=useState()
  const[isLoading,setIsLoading]=useState(false)
  let navigate = useNavigate()
  let mySchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
  });

  let formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      loginForm(values);
    }
  });

  async function loginForm(values) {
    setIsLoading(true)
      return await axios.post("https://dummyjson.com/auth/login", {
        username: values.username,
        password: values.password
      }).then((response)=>{
            console.log("Login success:", response.data);
            setToken(response.data.accessToken)
            setUserMessage(response.data.firstName)
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("user", JSON.stringify(response.data));
            setIsLoading(false)
            navigate("/")
      }).catch((error)=>{
        console.log("error", error.response?.data || error.message)
        setErrorMessage(error.response?.data?.message)
        setIsLoading(false)
      })
  }

  return (
    <>
      <div className={`${styles.Login} container mx-auto mt-16 max-w-lg p-8 bg-white rounded-2xl shadow-xl`}>
        <h2 className="font-semibold text-4xl text-center mb-2">Log in to TrendyMart</h2>
        <h6 className="text-[#DB4444] text-center mb-6">Enter your details below</h6>
        {userMessage?<div role="alert" className="alert alert-success">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  Login successful! Welcome {userMessage}
</div>:""}

{errorMessage?<div role="alert" className="alert alert-error">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  Login failed, Please try again 
</div>:""}

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-lg font-medium mb-2">Username:</label>
            <input type="text" name="username" id="username" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter your username" className="input input-bordered w-full mt-1 border-[#DB4444] focus:border-[#DB4444] focus:ring-[#DB4444]"/>
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium mb-2">Password:</label>
            <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter your password" className="input input-bordered w-full mt-1 border-[#DB4444] focus:border-[#DB4444] focus:ring-[#DB4444]"/>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
          </div>


          {isLoading?   <div className="flex justify-center">
            <button type="submit" className="btn w-1/2 bg-[#DB4444] hover:bg-red-600 border-none text-white text-lg py-3 rounded-xl" > <i className='fa fa-spinner fa-spin'></i></button>
          </div>: <div className="flex justify-center">
            <button type="submit" className="btn w-1/2 bg-[#DB4444] hover:bg-red-600 border-none text-white text-lg py-3 rounded-xl" disabled={!(formik.isValid&&formik.dirty)} > Log In</button>
          </div>}
        </form>
        <p className="text-center mt-6">Do not have an account? <Link to="/register" className="text-[#DB4444] font-medium">Register</Link></p>
      </div>
    </>
  );
}
