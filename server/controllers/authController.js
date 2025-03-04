import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "6d",
  });
};

const createSendResToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const isDev = process.env.NODE_ENV === "development" ? false : true;

  const cookieOption = {
    expire: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    security: isDev,
  };

  res.cookie("jwt", token, cookieOption);
  user.password = undefined;

  res.status(statusCode).json({
    data: user,
  });
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const isAdmin = (await User.countDocuments()) === 0;
  const role = isAdmin ? "admin" : "user";

  const createUser = await User.create({
    name,
    email,
    password,
    role,
  });

  createSendResToken(createUser, 201, res);
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Validasi jika kosong email, atau passwod
  if (!email || !password) {
    res.status(400);
    throw new Error("Email or Password is empty, please fill it!");
  }

  // 2. validasi apakah email terdaftar?
  const userData = await User.findOne({
    email,
  });

  // 3. check password
  if (userData && (await userData.comparePassword(password))) {
    createSendResToken(userData, 200, res);
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    return res.status(200).json({
      user,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const logoutUser = async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json({
    message: "logout successful",
  });
};
