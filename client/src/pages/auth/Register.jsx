import React from "react";
import FormAuth from "../../components/FormAuth";
import customAPI from "../../services/customAPI";

import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { registerUser } from "../../features/userSlice";
import SEO from "../../components/SEO";

export const action =
  (store) =>
  async ({ request }) => {
    console.log(store);
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);
    console.log(data);

    try {
      const response = await customAPI.post("auth/register", data);
      store.dispatch(registerUser(response.data));
      toast.success("Register Success");

      return redirect("/");
    } catch (error) {
      const errMessage = error?.response?.data?.message;
      toast.error(errMessage);
      return null;
    }
  };

const Register = () => {
  return (
    <main>
      <SEO title={"Register"} />
      <FormAuth isLogin={false} />
    </main>
  );
};

export default Register;
