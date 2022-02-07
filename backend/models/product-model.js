const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter the product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter the product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter the product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter the Product Category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter the product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
