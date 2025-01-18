import React, { useState } from "react";
import { Html } from "@react-three/drei";
import Close from "../../assets/close.svg";

function ProcedureModal({ isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);
  const pages = [
    {
      title: "Step 1",
      content: "Select the number of layers.",
    },
    {
      title: "Step 2",
      content: "Choose a shape for your cake.",
    },
    {
      title: "Step 3",
      content: "Pick colors for each layer.",
    },
    {
      title: "Step 4",
      content: "Add custom text and customize font.",
    },
    {
      title: "Step 5",
      content: "Take a screenshot and preview your design.",
    },
  ];

  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  if (!isOpen) return null;

  return (
    <Html center>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white min-w-96 p-6 rounded-lg shadow-lg relative">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition"
            onClick={onClose}
          >
            <img src={Close} alt="Close" className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-pink-500 mb-2">Procedure</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {pages[currentPage].title}
          </h2>
          <p className="text-gray-600 mb-6">{pages[currentPage].content}</p>
          <div className="flex justify-between">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`px-4 py-2 text-sm rounded-md ${
                currentPage === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-pink-500 text-white hover:bg-pink-600 transition"
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === pages.length - 1}
              className={`px-4 py-2 text-sm rounded-md ${
                currentPage === pages.length - 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-pink-500 text-white hover:bg-pink-600 transition"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Html>
  );
}

export default ProcedureModal;
