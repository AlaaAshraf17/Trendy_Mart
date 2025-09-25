import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState({ products: [] });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  async function addToCart(userId, product) {
    try {
      await axios.post("https://dummyjson.com/carts/add", {
        userId,
        products: [{ id: product.id, quantity: 1 }],
      });

      toast.success("Successfully added!");

      setCart((prevCart) => {
        if (!prevCart || !prevCart.products) {
          return { products: [{ ...product, quantity: 1 }] };
        }

        const exists = prevCart.products.find((p) => p.id === product.id);
        if (exists) {
          const updatedProducts = prevCart.products.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          );
          return { ...prevCart, products: updatedProducts };
        } else {
          return {
            ...prevCart,
                products: [...prevCart.products, {   
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                category: product.category,
                quantity: 1, }],
          };
        }
      });
    } catch (error) {
      console.log("Error adding to cart:", error.response?.data || error.message);
      toast.error("This didn't work.");
    }
  }

  function removeFromCart(productId) {
    setCart((prevCart)=>{
      const updatedProducts =prevCart.products.map((p)=>{
        if(p.id===productId){
          return {...p,quantity:p.quantity-1}
        }
        return p
      }).filter((p)=>p.quantity>0)
      return {
        ...prevCart,
        products:updatedProducts
      }
    })
  }

  function updateQuantity(productId, newQuantity) {
    setCart((prevCart) => {
      const updatedProducts = prevCart.products.map((p) =>
        p.id === productId ? { ...p, quantity: Number(newQuantity) } : p
      );
      return { ...prevCart, products: updatedProducts };
    });
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity ,setCart}}
    >
      {children}
    </CartContext.Provider>
  );
}
