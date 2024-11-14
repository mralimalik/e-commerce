import { Category } from "../models/category.model.js";

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error); 
    res.status(500).json({ message: "Failed to fetch categories", error: error.message });
  }
};

export { getCategories };
