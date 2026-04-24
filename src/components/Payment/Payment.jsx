import React, { useContext, useState } from 'react'
import styles from './Payment.module.css'
import { useFormik } from "formik"
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

export default function Payment() {
  const { setCart } = useContext(CartContext)
  const [isPaid, setIsPaid] = useState(false)

  let mySchema = Yup.object({
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .matches(/^0[0-9]{9,14}$/, "Phone number must start with 0 and be 10–15 digits long"),
    address: Yup.string()
      .required("Address is required")
      .min(10, "Address must be at least 10 characters long")
  });

  let formik = useFormik({
    initialValues: { phone: "", address: "" },
    validationSchema: mySchema,
    onSubmit: (values) => paying(values)
  });

  function paying(values) {
    console.log(values)
    setIsPaid(true)
    setCart([])
  }

  return (
    <>
      <div className="container mx-auto mt-16 max-w-lg p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        {isPaid ? (
          <>
            <h2 className="font-semibold text-3xl text-green-600 dark:text-green-400 mb-4">
              ✅ Payment Successful!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for your purchase. Your order has been placed.
            </p>
            <Link
              to="/"
              className="btn bg-[#DB4444] hover:bg-red-600 border-none text-white text-lg py-3 px-6 rounded-xl"
            >
              Continue Shopping
            </Link>
          </>
        ) : (
          <>
            <h2 className="font-semibold text-3xl text-center mb-6 text-gray-900 dark:text-white">Checkout</h2>
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="phone" className="block text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your phone"
                  className="w-full px-4 py-3 mt-1 border border-[#DB4444] rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#DB4444] transition"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Address:</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your address"
                  className="w-full px-4 py-3 mt-1 border border-[#DB4444] rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#DB4444] transition"
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/2 bg-[#DB4444] hover:bg-red-600 border-none text-white text-lg py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Pay Now
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  )
}
