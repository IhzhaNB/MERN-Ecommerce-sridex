import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customAPI from "../services/customAPI";

export const orderLoader = (storage) => async () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Login for access this page");
    return redirect("/login");
  }

  try {
    let endpoint = user.role === "admin" ? "order" : `order/current/user`;

    const { data } = await customAPI.get(endpoint);
    return { orders: data.data };
  } catch (error) {
    return null;
  }
};
