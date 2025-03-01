import React, { useState } from "react";
import { useCart } from "../CartContext";
import { motion } from "framer-motion";

const BakedItem = ({ title, description, price, image }) => {
  const { addToCart } = useCart();
  const [isFlying, setIsFlying] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to disable the button temporarily

  const handleAddToCart = () => {
    const userId = localStorage.getItem("id");
    console.log(userId);

    if (!userId) {
      console.error("User is not authenticated");
      return;
    }

    // Disable the button temporarily
    setIsButtonDisabled(true);

    // Trigger the flying animation
    setIsFlying(true);

    addToCart({
      userId,
      title,
      description,
      price,
      image,
      itemType: "standard",
      _id: title + "-" + price, // Generate a more stable _id
    });

    // Set a timeout to hide the flying image, re-enable the button, and navigate
    setTimeout(() => {
      setIsFlying(false);
      setIsButtonDisabled(false);
    }, 900); // Adjust duration to match animation
  };
  return (
    <div className="bg-gray-200 hover:bg-white p-4 rounded-lg text-center flex flex-col justify-between h-full relative">
      {/* Original Image */}
      <img src={image} alt={title} className="w-60 h-50 mx-auto rounded-lg" />

      {/* Flying Image */}
      {isFlying && (
        <motion.img
          src={image}
          alt={title}
          initial={{ x: 50, y: -10, scale: 0 }}
          animate={{ x: 100, y: -100, scale: 1, opacity: 0 }} // Adjust based on the cart position
          transition={{ duration: 0.9 }}
          className="absolute w-60 h-50"
          style={{ pointerEvents: "none", zIndex: 70 }} // Keep it above other content
        />
      )}

      <h4 className="font-semibold text-lg my-2">{title}</h4>
      <p className="text-gray-500 text-sm">{description}</p>
      <button
        onClick={handleAddToCart}
        className="bg-red-500 hover:bg-primary text-white mt-6 rounded-full px-6 py-2 w-full"
        disabled={isButtonDisabled} // Disable the button while the animation is running
      >
        {isButtonDisabled ? "Adding..." : `Add to cart ₱ ${price.toFixed(2)}`}
      </button>
    </div>
  );
};

export default BakedItem;
