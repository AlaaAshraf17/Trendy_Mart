import React, { useContext, useState } from 'react'
import styles from "./Register.module.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useFormik } from "formik"
import * as Yup from 'yup';
import { tokenContext } from '../../Context/Context';

export default function Register() {
  let { setToken } = useContext(tokenContext);
  const [userMessage, setUserMessage] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()

  let mySchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  });

  let formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      registerForm(values);
    }
  });


  async function registerForm(values){
    setIsLoading(true)
    return await axios.post("https://dummyjson.com/users/add",{
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        password: values.password,
    }).then((response)=>{
      console.log(response.data)

      //login after register
      return axios.post("https://dummyjson.com/auth/login",{
          username: values.username,
          password: values.password,
      })
    }).then((loginRes)=>{
      setToken(loginRes.data.accessToken)
      localStorage.setItem("token",loginRes.data.accessToken)
      localStorage.setItem("user",JSON.stringify(loginRes.data))
      setUserMessage("");
      setUserMessage("Account craeted successfuuly")
      setIsLoading(false)
      navigate("/login")
    })
    .catch((error) => {
    console.log("Register error:", error.response?.data || error.message);
     setUserMessage("");
    setErrorMessage("Registration failed");
    setIsLoading(false);
  });
  }
  

  return (
    <div className={`${styles.Register} container mx-auto mt-16 max-w-lg p-8 bg-white rounded-2xl shadow-xl`}>
      <h2 className="font-semibold text-4xl text-center mb-2 text-black">Create an Account</h2>
      <h6 className="text-[#DB4444] text-center mb-6">Enter your details below</h6>

      {userMessage ? <div role="alert" className="alert alert-success">
        {userMessage}
      </div> : ""}

      {errorMessage ? <div role="alert" className="alert alert-error">
        {errorMessage}
      </div> : ""}

      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="firstName" className="block text-lg font-medium mb-2 text-black">First Name:</label>
          <input type="text" name="firstName" id="firstName" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter your first name" className="input input-bordered w-full mt-1 border-[#DB4444] focus:ring-[#DB4444]" />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.firstName}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-lg font-medium mb-2 text-black">Last Name:</label>
          <input type="text" name="lastName" id="lastName" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter your last name" className="input input-bordered w-full mt-1 border-[#DB4444] focus:ring-[#DB4444]" />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.lastName}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="username" className="block text-lg font-medium mb-2 text-black">Username:</label>
          <input type="text" name="username" id="username" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter your username" className="input input-bordered w-full mt-1 border-[#DB4444] focus:ring-[#DB4444]" />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="block text-lg font-medium mb-2 text-black">Email:</label>
          <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter your email" className="input input-bordered w-full mt-1 border-[#DB4444] focus:ring-[#DB4444]" />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="password" className="block text-lg font-medium mb-2 text-black">Password:</label>
          <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter your password" className="input input-bordered w-full mt-1 border-[#DB4444] focus:ring-[#DB4444]" />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
          ) : null}
        </div>

        {isLoading ?
          <div className="flex justify-center">
            <button type="submit" className="btn w-1/2 bg-[#DB4444] border-none text-white text-lg py-3 rounded-xl">
              <i className='fa fa-spinner fa-spin'></i>
            </button>
          </div>
          :
          <div className="flex justify-center">
            <button type="submit" className="btn w-1/2 bg-[#DB4444] hover:bg-red-600 border-none text-white text-lg py-3 rounded-xl" disabled={!(formik.isValid && formik.dirty)} > <Link to="/login">Register</Link> </button>
          </div>}
      </form>

      <p className="text-center mt-6 text-black">Already have an account? <Link to="/login" className="text-[#DB4444] font-medium">Log in</Link></p>
    </div>
  )
}

