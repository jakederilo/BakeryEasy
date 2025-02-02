import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to fetch cart items for the logged-in user
  const fetchCartItems = () => {
    const userId = localStorage.getItem("id"); // Assuming user ID is stored in localStorage
    if (!userId) return; // Prevent fetch if user is not logged in

    axios
      .get(`${apiUrl}/carts/${userId}`)
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => console.error("Error fetching cart items:", error));
  };

  // Fetch cart items when the component mounts
  useEffect(() => {
    fetchCartItems();
  }, []);

  const addToCart = ({
    userId,
    title,
    description,
    quantity,
    flavor,
    price,
    image,
    itemType = "regular", // Default to 'regular' if not provided
  }) => {
    axios
      .post(`${apiUrl}/carts/`, {
        userId,
        title,
        description,
        price,
        image,
        quantity,
        flavor,
        itemType, // Include itemType in the payload
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          // Re-fetch the cart items to ensure the UI stays in sync with the database
          fetchCartItems();
        }
      })
      .catch((error) => console.error("Error adding to cart:", error));
  };

  const removeFromCart = (itemId) => {
    axios
      .delete(`${apiUrl}/carts/item/${itemId}`)
      .then((response) => {
        if (response.status === 200) {
          // Update local state to remove the deleted item from the cart
          setCartItems((prevCart) =>
            prevCart.filter((item) => item._id !== itemId)
          );
        }
      })
      .catch((error) => console.error("Error removing from cart:", error));
  };

  const clearCart = () => {
    const userId = localStorage.getItem("id");
    if (!userId) return;

    axios
      .delete(`${apiUrl}/carts/clear/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          setCartItems([]); // Clear the cart locally
        }
      })
      .catch((error) => console.error("Error clearing cart:", error));
  };

  const increaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId
          ? { ...item, quantity: item.quantity ? item.quantity + 1 : 2 }
          : item
      )
    );

    // Notify the server
    axios
      .put(`${apiUrl}/carts/item/${itemId}/increase`)
      .catch((error) => console.error("Error increasing quantity:", error));
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

    // Notify the server
    axios
      .put(`${apiUrl}/carts/item/${itemId}/decrease`)
      .catch((error) => console.error("Error decreasing quantity:", error));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
