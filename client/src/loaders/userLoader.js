import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const userLoader = (storage) => () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Login for access this page");
    return redirect("/login");
  }
};
