import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../components/form/FormInput";
import CartTotal from "../components/CartTotal";
import customAPI from "../services/customAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearCartItem } from "../features/cartSlice";

const insertSnapScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    );
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const user = useSelector((state) => state.userState.user);
  const carts = useSelector((state) => state.cartState.CartItems);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    insertSnapScript();
  }, []);

  const handleCheckout = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData);
    const newArrayCart = carts.map((cart) => {
      return { product: cart.productId, quantity: cart.amount };
    });

    try {
      const response = await customAPI.post("/order", {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        cartItem: newArrayCart,
      });

      const snapToken = response.data.token;

      window.snap.pay(snapToken.token, {
        // Optional
        onSuccess: function (result) {
          console.log(result);
          dispatch(clearCartItem());
          navigate("/orders");
        },
        // Optional
        onPending: function (result) {
          console.log(result);
          alert("payment pending!");
        },
        // Optional
        onError: function (result) {
          console.log(result);
          alert("Error payment!");
        },
      });

      toast.success("Checkout Success");
    } catch (error) {
      const errMessage = error?.response?.data?.message;
      toast.error(errMessage);
    }
  };

  return (
    <>
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">Checkout product</h2>
      </div>

      <div className="mt-8 grid gap-y-8 gap-x-2 lg:grid-cols-12">
        {/* Form */}
        <div className="lg:col-span-8">
          <form
            className="bg-base-300 rounded-2xl grid grid-y-5 p-5 items-center"
            onSubmit={handleCheckout}
          >
            <div className="grid grid-cols-2 gap-x-4">
              <FormInput
                label={"First Name"}
                type={"name"}
                name={"firstName"}
              />
              <FormInput label={"Last Name"} type={"name"} name={"lastName"} />
            </div>
            <FormInput
              label={"Email"}
              type={"email"}
              name={"email"}
              defaultValue={user.email}
            />
            <FormInput label={"Phone"} type={"name"} name={"phone"} />
            <button type="submit" className="btn btn-primary mt-8">
              Checkout
            </button>
          </form>
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotal />
        </div>
      </div>
    </>
  );
};

export default Checkout;
