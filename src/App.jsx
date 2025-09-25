import { useState } from 'react'
import Login from './components/Login/Login'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import NotFound from './components/NotFound/NotFound'
import Home from "./components/Home/Home"
import Categories from "./components/Categories/Categories"
import Register from './components/Register/Register'
import Payment from './components/Payment/Payment'
import SingleProduct from './components/SingleProduct/SingleProduct'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProtectedAuth from './components/ProtectedAuth/ProtectedAuth'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import toast, { Toaster } from 'react-hot-toast';
import Wishlist from './components/Wishlist/Wishlist'



function App() {
  const queryClient =new QueryClient()
  let routes = createBrowserRouter([{
  path:"",element:<Layout></Layout>,children:[
    {index:true,element:<ProtectedRoutes><Home></Home></ProtectedRoutes>},
    {path:"login",element:<ProtectedAuth><Login></Login></ProtectedAuth>},
    {path:"register",element:<ProtectedAuth><Register></Register></ProtectedAuth>},
    {path:"singleproducts/:id",element:<ProtectedRoutes><SingleProduct></SingleProduct></ProtectedRoutes>},
    {path:"cart",element:<ProtectedRoutes><Cart></Cart></ProtectedRoutes>},
    {path:"products",element:<Products></Products>},
    {path:"categories",element:<Categories></Categories>},
    {path:"payment",element:<Payment></Payment>},
    {path:"wishlist",element:<Wishlist></Wishlist>},
    {path:"*",element:<NotFound></NotFound>},
    
  ]
  }])
  

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster></Toaster>
    </QueryClientProvider> 
    </>
  )
}

export default App
