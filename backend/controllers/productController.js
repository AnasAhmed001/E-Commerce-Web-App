import Product from "../models/productModel.js";
import { uploadToCloudinary } from "../utils/cloudinaryUtils.js";

// Create Product
export const createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const userId = req.user._id;

  // Check if file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  if (!name || !description || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Upload image to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(req.file.buffer, "products");
    const newProduct = new Product({
      name,
      description,
      price,
      image: cloudinaryResult.secure_url,
      userId: userId,
    });
    await newProduct.save();
    res.status(201).json({ 
      message: "Product created successfully", 
      product: {
        _id: newProduct._id,
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        image: newProduct.image,
        userId: newProduct.userId,
        createdAt: newProduct.createdAt,
        updatedAt: newProduct.updatedAt
      }
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get All Products

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Product by ID

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("userId", "name email");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Product

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Update Product

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const userId = req.user._id;

  if (!name || !description || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Upload new image to Cloudinary if file is provided
    if (req.file) {
      const cloudinaryResult = await uploadToCloudinary(req.file.buffer, "products");
      product.image = cloudinaryResult.secure_url;
    }

    product.name = name;
    product.description = description;
    product.price = price;

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
