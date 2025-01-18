import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("id");
      if (!userId) {
        console.error("User not logged in.");
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/orders/${userId}`
      );
      setOrders(response.data);
      setFilteredOrders(response.data); // Initialize filtered orders
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/orders/${orderId}`, {
        status: newStatus,
      });
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      setFilteredOrders(
        filteredOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleBuyAgain = () => {
    navigate("/cart");
  };

  const handleFilterChange = (status) => {
    setSelectedStatus(status);
    if (status === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === status));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="status-filter" className="font-medium mr-2">
          Filter by Status:
        </label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Baking">Baking</option>
          <option value="Ready for Pickup">Ready for Pickup</option>
          <option value="Picked Up">Picked Up</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>

      <ul className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <li
              key={order._id}
              className="relative border p-4 rounded shadow flex"
            >
              {/* Status in Upper-Right Corner */}
              <span
                className={`absolute top-2 right-2 font-medium ${
                  order.status === "Pending"
                    ? "text-yellow-500"
                    : order.status === "Baking"
                      ? "text-blue-500"
                      : order.status === "Ready for Pickup"
                        ? "text-green-500"
                        : order.status === "Picked Up"
                          ? "text-gray-500"
                          : "text-red-500"
                }`}
              >
                {order.status}
              </span>

              {/* Order Details */}
              <div className="flex-1">
                <div className="mb-2">
                  <h2 className="text-lg font-medium">
                    Order ID - {order._id.slice(0, 5)}
                  </h2>
                </div>
                <div>
                  <p>
                    <strong>Items:</strong>{" "}
                    {order.cartItems && order.cartItems.length > 0
                      ? order.cartItems.map((item) => item.title).join(", ")
                      : "No items in the cart"}
                  </p>
                  <p>
                    <strong>Pickup Time:</strong> {order.pickupDateTime}
                  </p>
                  <p>
                    <strong>Total Amount:</strong> {order.totalAmount}
                  </p>
                  <p>
                    <strong>Total Quantity:</strong> {order.quantity}
                  </p>
                  <p>
                    <strong>Payment Method:</strong> {order.paymentMethod}
                  </p>
                </div>
                <div className="mt-4">
                  {order.status === "Picked Up" ? (
                    <button
                      onClick={handleBuyAgain}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Buy Again
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(order._id, "Canceled")}
                      className={`py-2 px-4 rounded font-bold ${
                        order.status === "Canceled" ||
                        order.status === "Baking" ||
                        order.status === "Ready for Pickup"
                          ? "bg-transparent border border-red-300 text-gray-500 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-700 text-white"
                      }`}
                      disabled={
                        order.status === "Baking" ||
                        order.status === "Canceled" ||
                        order.status === "Ready for Pickup"
                      }
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>

              {/* Centered Images */}
              <div className="flex items-center justify-center flex-1">
                <div className="grid grid-cols-3 gap-4">
                  {order.cartItems.map((item, index) => (
                    <img
                      key={index}
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            </li>
          ))
        ) : (
          <p></p>
        )}
      </ul>
    </div>
  );
};

export default Order;
