import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      trim: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quantity: {
      required: true,
      type: Number,
    },
    purchasePrice: {
      type: Number,
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Completed", "Shipped", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Category", orderSchema);
