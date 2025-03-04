import express from "express";
import {
  adminMiddleware,
  protectedMiddleware,
} from "../middlewares/authMiddleware.js";

import {
  createProduct,
  deleteProduct,
  fileUpload,
  getDetailProduct,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";
import { upload } from "../utils/uploadFileHandler.js";

const router = express.Router();

// Create Product (owner)
// post /api/v1/product
router.post("/", protectedMiddleware, adminMiddleware, createProduct);

// update Detail Product (owner)
// update /api/v1/product/:id
router.put("/:id", protectedMiddleware, adminMiddleware, updateProduct);

// delete Detail Product (owner)
// delete /api/v1/product/:id
router.delete("/:id", protectedMiddleware, adminMiddleware, deleteProduct);

// file upload data Product (owner)
// upload /api/v1/product/:id
router.post(
  "/file-upload",
  protectedMiddleware,
  adminMiddleware,
  upload.single("image"),
  fileUpload
);

// get Product
// get /api/v1/product
router.get("/", getProduct);

// get Detail Product
// get /api/v1/product/:id
router.get("/:id", getDetailProduct);

export default router;
