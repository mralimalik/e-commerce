import { Product } from "../models/product.model.js";
import { upload } from "../middleware/image_upload.js";
import { uploadOnCloudinary } from "../cloudinaryconfig.js";
import mongoose from "mongoose";

const listProduct = async (req, res) => {
  try {
    const sellerId = req.user?._id;

    if (!sellerId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: No seller ID found" });
    }

    // Check if the required fields are present
    const { name, price, categoryId } = req.body;
    const productImage = req.file;

    if (!name || !price || !categoryId || !productImage) {
      return res.status(400).json({ error: "Missing required fields " });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadOnCloudinary(productImage.path);

    if (!uploadedImage) {
      return res
        .status(500)
        .json({ error: "Failed to upload image to Cloudinary" });
    }

    const imageUrl = uploadedImage.url;

    const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

    // Create the new product
    const product = new Product({
      name,
      price,
      imageUrl,
      categoryId: categoryObjectId,
      sellerId: sellerId,
    });

    // Save the product to the database
    await product.save();

    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (e) {
    console.error("Error saving product data", e.message);

    // Catch other errors
    return res
      .status(500)
      .json({ error: "Server error, please try again later", e });
  }
};

const getAllProducts = async (req, res) => {
  try {
    
    // Fetch all products and populate sellerId and categoryId references
    const products = await Product.find({})
      .populate("sellerId")
      .populate("categoryId");

    res.status(200).json({ data: products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products. Please try again later.",
      error: error.message,
    });
  }
};

const getProductByName = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ error: "Missing search term" });
    }
    // Find products by matching the name with a case-insensitive regex
    const products = await Product.find({
      name: { $regex: name, $options: "i" }, // "i" makes the search case-insensitive
    })
      .populate("sellerId")
      .populate("categoryId");

    // Check if any products were found
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found matching the search term" });
    }

    // Return the matching products
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products by name:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products. Please try again later.",
      error: error.message,
    });
  }
};

export { getAllProducts, getProductByName, listProduct };
