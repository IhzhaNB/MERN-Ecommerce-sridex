import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    message: "create Product successful",
    data: newProduct,
  });
});

export const getProduct = asyncHandler(async (req, res) => {
  // Req Query
  const queryObj = { ...req.query };

  // fungsi untuk mengabaikan jika ada req page dan limit
  const excludeField = ["page", "limit", "name"];
  excludeField.forEach((item) => delete queryObj[item]);

  let query;
  if (req.query.name) {
    query = Product.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  } else {
    // fungsi filter berdasarkan category
    query = Product.find(queryObj);
  }

  // pagination
  const page = req.query.page * 1 || 1; // mengubah string menjadi angka
  const limitData = req.query.limit * 1 || 12; // mengubah string menjadi angka
  const skipData = (page - 1) * limitData;

  query = query.skip(skipData).limit(limitData);

  let countProduct = await Product.countDocuments(queryObj);
  if (req.query.page) {
    if (skipData >= countProduct) {
      res.status(404);
      throw new Error("This page does not exist");
    }
  }

  const data = await query;
  const totalPage = Math.ceil(countProduct / limitData);

  return res.status(200).json({
    message: "get Product successful",
    data,
    pagination: {
      totalPage,
      page,
      totalProduct: countProduct,
    },
  });
});

export const getDetailProduct = asyncHandler(async (req, res) => {
  const paramId = req.params.id;
  const detailProduct = await Product.findById(paramId);
  if (!detailProduct) {
    res.status(404);
    throw new Error("Product not found");
  }

  return res.status(200).json({
    message: "get Detail Product successful",
    data: detailProduct,
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const paramId = req.params.id;
  const productUpdate = await Product.findByIdAndUpdate(paramId, req.body, {
    runValidators: true,
    new: true,
  });
  if (!productUpdate) {
    res.status(404);
    throw new Error("Product not found");
  }

  return res.status(200).json({
    message: "Update Product successful",
    data: productUpdate,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const paramId = req.params.id;
  await Product.findByIdAndDelete(paramId);

  return res.status(200).json({
    message: "Delete Product successful",
  });
});

export const fileUpload = asyncHandler(async (req, res) => {
  const stream = cloudinary.uploader.upload_stream(
    {
      folder: "uploads",
      allowed_formats: ["jpg", "png", "jpeg"],
    },
    function (err, result) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Upload Image failed", error: err });
      }

      res.json({ message: "Upload Image successful", url: result.secure_url });
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(stream);
});
