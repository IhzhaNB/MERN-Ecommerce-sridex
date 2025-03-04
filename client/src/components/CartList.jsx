import React from "react";
import { useSelector } from "react-redux";
import CartListItems from "./CartListItems";

const CartList = () => {
  const cartItems = useSelector((state) => state.cartState.CartItems);
  return (
    <>
      {cartItems.map((cart) => (
        <CartListItems key={cart.cartId} cartItem={cart} />
      ))}
    </>
  );
};

export default CartList;
