import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Store userId as a string
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  cartItems: [
    {
      title: { type: String, required: true },
      description: { type: String }, // Optional description
      price: { type: Number, required: true },
      flavor: { type: String },
      category: { type: String }, // Optional category
      imagePath: { type: String }, // Optional image path
      image: { type: String, required: true },
      pickupTime: { type: Date }, // New field for pickup time
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  pickupDateTime: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  quantity: { type: Number, required: true },
  paymentLink: { type: String },
  shortOrderId: { type: String, unique: true },
  status: {
    type: String,
    enum: ["Pending", "Baking", "Ready for Pickup", "Picked Up", "Canceled"], // Status options
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now }, // Timestamp for order creation
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
