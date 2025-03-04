import express from "express";
import {
  adminMiddleware,
  protectedMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  callbackPayment,
  createOrder,
  currentUserOrder,
  detailOrder,
  getAllOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// Create Order (user)
// post /api/v1/Order
router.post("/", protectedMiddleware, createOrder);

// get Order (admin)
// get /api/v1/Order
router.get("/", protectedMiddleware, adminMiddleware, getAllOrder);

// get Detail Order (admin)
// get /api/v1/Order/:id
router.get("/:id", protectedMiddleware, adminMiddleware, detailOrder);

// get Detail Order (user)
// get /api/v1/Order/current-user
router.get("/current/user", protectedMiddleware, currentUserOrder);

// post /api/v1/Order/callback/midtrans
router.post("/callback/midtrans", callbackPayment);

export default router;
