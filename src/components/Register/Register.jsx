import React, { useContext, useState } from 'react'
import styles from "./Register.module.css"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useFormik } from "formik"
import * as Yup from 'yup';
import { tokenContext } from '../../Context/Context';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyClSWoKst7vGXxgmB5OAEN61sO_2kC0YHs",
  authDomain: "registerapi-903a6.firebaseapp.com",
  projectId: "registerapi-903a6",
  storageBucket: "registerapi-903a6.firebasestorage.app",
  messagingSenderId: "750324275509",
  appId: "1:750324275509:web:1d643bef881d0c7dccd47c",
  measurementId: "G-VFBMZJP0NM"
};
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

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
    initialValues: { firstName: "", lastName: "", username: "", email: "", password: "" },
    validationSchema: mySchema,
    onSubmit: (values) => registerForm(values)
  });

  async function registerForm(values) {
    setIsLoading(true)
    return await axios.post("https://dummyjson.com/users/add", {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      email: values.email,
      password: values.password,
    }).then((response) => {
      return axios.post("https://dummyjson.com/auth/login", {
        username: values.username,
        password: values.password,
      })
    }).then((loginRes) => {
      setToken(loginRes.data.accessToken)
      localStorage.setItem("token", loginRes.data.accessToken)
      localStorage.setItem("user", JSON.stringify(loginRes.data))
      setUserMessage("Account created successfully")
      setIsLoading(false)
      navigate("/login")
    }).catch((error) => {
      setErrorMessage("Registration failed");
      setIsLoading(false);
    });
  }

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      user.getIdToken().then((token) => {
        localStorage.setItem("token", token)
        Navigate("/")
      })
    }).catch((error) => {
      console.error("error during login: ", error)
    })
  }

  const inputClass = "w-full px-4 py-3 mt-1 border border-[#DB4444] rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#DB4444] transition"

  return (
    <div className="container mx-auto mt-16 max-w-lg p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
      <h2 className="font-semibold text-4xl text-center mb-2 text-gray-900 dark:text-white">Create an Account</h2>
      <h6 className="text-[#DB4444] text-center mb-6">Enter your details below</h6>

      {userMessage && (
        <div role="alert" className="flex items-center gap-2 p-3 mb-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg border border-green-200 dark:border-green-800">
          <i className="fa-solid fa-circle-check"></i> {userMessage}
        </div>
      )}
      {errorMessage && (
        <div role="alert" className="flex items-center gap-2 p-3 mb-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800">
          <i className="fa-solid fa-circle-xmark"></i> {errorMessage}
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-2 text-sm text-gray-700 dark:text-gray-300">
        <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">
          <i className="fa-solid fa-circle-info mr-2"></i>Demo Note
        </p>
        <p>Use any email but use this password: <span className="font-mono font-bold text-gray-900 dark:text-white">emilyspass</span></p>
      </div>

      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="firstName" className="block text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">First Name:</label>
          <input type="text" name="firstName" id="firstName" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter your first name" className={inputClass} />
          {formik.touched.firstName && formik.errors.firstName && <div className="text-red-500 text-sm mt-1">{formik.errors.firstName}</div>}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Last Name:</label>
          <input type="text" name="lastName" id="lastName" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter your last name" className={inputClass} />
          {formik.touched.lastName && formik.errors.lastName && <div className="text-red-500 text-sm mt-1">{formik.errors.lastName}</div>}
        </div>

        <div>
          <label htmlFor="username" className="block text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Username:</label>
          <input type="text" name="username" id="username" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter your username" className={inputClass} />
          {formik.touched.username && formik.errors.username && <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>}
        </div>

        <div>
          <label htmlFor="email" className="block text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Email:</label>
          <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter your email" className={inputClass} />
          {formik.touched.email && formik.errors.email && <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>}
        </div>

        <div>
          <label htmlFor="password" className="block text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Password:</label>
          <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter your password" className={inputClass} />
          {formik.touched.password && formik.errors.password && <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/2 bg-[#DB4444] hover:bg-red-600 border-none text-white text-lg py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Register"}
          </button>
        </div>
      </form>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" className="w-6 h-6" />
          Continue with Google
        </button>
      </div>

      <p className="text-center mt-6 text-gray-700 dark:text-gray-300">
        Already have an account?{" "}
        <Link to="/login" className="text-[#DB4444] font-medium hover:underline">Log in</Link>
      </p>
    </div>
  )
}
