import React from "react";
import FormAuth from "../../components/FormAuth";
import customAPI from "../../services/customAPI";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { loginUser } from "../../features/userSlice";
import SEO from "../../components/SEO";

export const action =
  (store) =>
  async ({ request }) => {
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);

    try {
      const response = await customAPI.post("auth/login", data);
      store.dispatch(loginUser(response.data));
      toast.success("Login Success");

      return redirect("/");
    } catch (error) {
      const errMessage = error?.response?.data?.message;
      toast.error(errMessage);
      return null;
    }
  };

const Login = () => {
  return (
    <main>
      <SEO title={"Login"} />
      <FormAuth isLogin />
    </main>
  );
};

export default Login;
