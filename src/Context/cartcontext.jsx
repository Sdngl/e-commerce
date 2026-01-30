import React, { createContext, useState } from "react";

// Create the context
export const CartContext = createContext();

// Context Provider component
export default function CartContextProvider({ children }) {
  const [cart, setcart] = useState(()=>{
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }); // keep your original state name

  const addToCart = (product) => {
    setcart(prev => [...prev, product]);
    console.log("Product added to cart:", product);
  };
  

  return (
    <CartContext.Provider value={{ cart, setcart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
