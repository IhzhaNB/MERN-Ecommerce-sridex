import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartList from "../components/CartList";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const user = useSelector((state) => state.userState.user);
  const numItemInCart = useSelector((state) => state.cartState.numItemsInCart);
  if (numItemInCart === 0) {
    return (
      <>
        <h1 className="text-3xl text-center font-bold">
          Your cart is currently empty
        </h1>
      </>
    );
  }

  return (
    <>
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">Cart</h2>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotal />
          {user ? (
            <Link className="btn btn-primary btn-block mt-8" to={"/checkout"}>
              Check out
            </Link>
          ) : (
            <Link className="btn btn-primary btn-block mt-8" to={"/login"}>
              Please login to checkout
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
