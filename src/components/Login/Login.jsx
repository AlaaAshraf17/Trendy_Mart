import React, { useContext, useState } from 'react'
import styles from "./Login.module.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useFormik } from "formik"
import * as Yup from 'yup';
import { tokenContext } from '../../Context/Context';

export default function Login() {
  let { token, setToken } = useContext(tokenContext)
  const [userMessage, setUserMessage] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()

  let mySchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
  });

  let formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: mySchema,
    onSubmit: (values) => loginForm(values)
  });

  async function loginForm(values) {
    setIsLoading(true)
    return await axios.post("https://dummyjson.com/auth/login", {
      username: values.username,
      password: values.password
    }).then((response) => {
      setToken(response.data.accessToken)
      setUserMessage(response.data.firstName)
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data));
      setIsLoading(false)
      navigate("/")
    }).catch((error) => {
      setErrorMessage(error.response?.data?.message)
      setIsLoading(false)
    })
  }

  return (
    <>
      <div className="container mx-auto mt-16 max-w-lg p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        <h2 className="font-semibold text-4xl text-center mb-2 text-gray-900 dark:text-white">Log in to TrendyMart</h2>
        <h6 className="text-[#DB4444] text-center mb-6">Enter your details below</h6>

        {userMessage && (
          <div role="alert" className="flex items-center gap-2 p-3 mb-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg border border-green-200 dark:border-green-800">
            <i className="fa-solid fa-circle-check"></i>
            Login successful! Welcome {userMessage}
          </div>
        )}

        {errorMessage && (
          <div role="alert" className="flex items-center gap-2 p-3 mb-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800">
            <i className="fa-solid fa-circle-xmark"></i>
            Login failed, please try again
          </div>
        )}

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your username"
              className="w-full px-4 py-3 mt-1 border border-[#DB4444] rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#DB4444] transition"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password"
              className="w-full px-4 py-3 mt-1 border border-[#DB4444] rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#DB4444] transition"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 bg-[#DB4444] hover:bg-red-600 border-none text-white text-lg py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={!(formik.isValid && formik.dirty)}
            >
              {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Log In"}
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-gray-700 dark:text-gray-300">
          Do not have an account?{" "}
          <Link to="/register" className="text-[#DB4444] font-medium hover:underline">Register</Link>
        </p>
      </div>
    </>
  );
}
