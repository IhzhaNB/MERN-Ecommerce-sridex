import React from "react";
import { Form, Link } from "react-router-dom";
import FormInput from "./form/FormInput";

const FormAuth = ({ isLogin }) => {
  return (
    <div className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-300 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">
          {isLogin ? "Sign in" : "Sign up"}
        </h4>
        {!isLogin ? (
          <FormInput type={"text"} name={"name"} label={"name"} />
        ) : null}
        <FormInput type={"email"} name={"email"} label={"email"} />
        <FormInput type={"password"} name={"password"} label={"password"} />

        <div className="mt-4">
          <button type="submit" className="btn btn-primary btn-block">
            {isLogin ? "Login" : "Register"}
          </button>
        </div>

        {isLogin ? (
          <p className="text-center">
            Don't have an account?{" "}
            <Link to={"/register"} className="link link-primary">
              Sign up
            </Link>
          </p>
        ) : (
          <p className="text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="link link-primary">
              Sign in
            </Link>
          </p>
        )}
      </Form>
    </div>
  );
};

export default FormAuth;
