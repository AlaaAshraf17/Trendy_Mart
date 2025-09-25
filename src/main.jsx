import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import App from './App.jsx'
import TokenContextProvider from "./Context/Context.jsx";
import CartContextProvider from "./Context/CartContext.jsx";
import WishlistContextProvider from "./Context/WishlistContext.jsx";

createRoot(document.getElementById('root')).render(
  <WishlistContextProvider>
      <CartContextProvider>
      <TokenContextProvider>
      <App />
      </TokenContextProvider>
      </CartContextProvider>
      </WishlistContextProvider>
  
  ,
)
