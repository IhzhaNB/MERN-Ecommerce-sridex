import midtransClient from "midtrans-client";
import dotenv from "dotenv";

import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

dotenv.config();

let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

export const createOrder = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, phone, cartItem } = req.body;

  if (!cartItem || cartItem.length < 1) {
    res.status(400);
    throw new Error("Cart item is empty");
  }

  let orderItem = [];
  let orderMidtrans = [];
  let total = 0;

  for (let cart of cartItem) {
    const productData = await Product.findOne({ _id: cart.product });
    if (!productData) {
      res.status(400);
      throw new Error("Product not found");
    }

    const { name, price, _id, stock } = productData;
    if (cart.quantity > stock) {
      res.status(404);
      throw new Error(`Stock ${name} is not enough, please reduce quantity`);
    }
    const singleProduct = {
      quantity: cart.quantity,
      name,
      price,
      product: _id,
    };

    const shortName = name.substring(0, 30);
    const singleProductMidtrans = {
      quantity: cart.quantity,
      name,
      price,
      id: _id,
    };

    orderItem = [...orderItem, singleProduct];
    orderMidtrans = [...orderMidtrans, singleProductMidtrans];

    total += cart.quantity * productData.price;
  }

  const order = await Order.create({
    item_detail: orderItem,
    total,
    firstName,
    lastName,
    email,
    phone,
    user: req.user.id,
  });

  let parameter = {
    transaction_details: {
      order_id: order._id,
      gross_amount: total,
    },
    item_details: orderMidtrans,
    customer_details: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
    },
  };

  const token = await snap.createTransaction(parameter);

  res.status(200).json({
    message: "create order successful",
    total,
    order,
    token,
  });
});

export const getAllOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find();

  res.status(200).json({
    message: "get all order successful",
    data: orders,
  });
});

export const detailOrder = asyncHandler(async (req, res) => {
  const detailOrder = await Order.findById(req.params.id);
  if (!detailOrder) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.status(200).json({
    message: "get detail order successful",
    data: detailOrder,
  });
});

export const currentUserOrder = asyncHandler(async (req, res) => {
  const currenUser = await Order.find({ user: req.user.id });

  res.status(200).json({
    message: "get current user order successful",
    data: currenUser,
  });
});

export const callbackPayment = asyncHandler(async (req, res) => {
  const statusResponse = await snap.transaction.notification(req.body);

  let orderId = statusResponse.order_id;
  let transactionStatus = statusResponse.transaction_status;
  let fraudStatus = statusResponse.fraud_status;

  const orderData = await Order.findById(orderId);
  if (!orderData) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Sample transactionStatus handling logic

  if (transactionStatus == "capture" || transactionStatus == "settlement") {
    if (fraudStatus == "accept") {
      const orderProduct = orderData.item_detail;
      for (const itemProduct of orderProduct) {
        const productData = await Product.findById(itemProduct.product);
        if (!productData) {
          res.status(404);
          throw new Error("Product not found");
        }

        productData.stock -= itemProduct.quantity;
        await productData.save();
      }
      orderData.status = "success";
    }
    // TODO set transaction status on your database to 'success'
    // and response with 200 OK
  } else if (
    transactionStatus == "cancel" ||
    transactionStatus == "deny" ||
    transactionStatus == "expire"
  ) {
    // TODO set transaction status on your database to 'failure'
    // and response with 200 OK
    orderData.status = "failed";
  } else if (transactionStatus == "pending") {
    // TODO set transaction status on your database to 'pending' / waiting payment
    // and response with 200 OK
    orderData.status = "pending";
  }

  await orderData.save();

  return res.status(200).send("Notification Payment successful");
});
