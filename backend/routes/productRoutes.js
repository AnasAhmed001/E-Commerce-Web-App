import {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct} from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import express from 'express';
import { upload } from '../utils/multerUtils.js';

const router = express.Router();

// Admin only routes - create, update, delete
router.post("/add", protect, adminOnly, upload.single("image"), createProduct);
router.put("/:id", protect, adminOnly, upload.single("image"), updateProduct);
router.delete("/delete/:id", protect, adminOnly, deleteProduct);

// Public routes - anyone can view products
router.get("/", getAllProducts);
router.get("/:id", getProductById);

export default router;
