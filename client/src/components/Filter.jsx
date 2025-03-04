import React from "react";
import { Form, Link, useLoaderData } from "react-router-dom";
import FormInput from "./form/FormInput";
import FormSelect from "./form/FormSelect";

const Filter = () => {
  const categories = ["", "sepatu", "baju", "celana", "kemeja", "jaket"];
  const { params } = useLoaderData();
  const { name, category } = params;

  return (
    <Form
      method="get"
      className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-3 grid-cols-1 md:grid-cols-2 items-center"
    >
      <FormInput
        label={"Search Product"}
        type={"search"}
        name={"name"}
        defaultValue={name}
      />
      <FormSelect
        label={"Select Category"}
        name={"category"}
        lists={categories}
        defaultValue={category}
      />
      <button type="submit" className="btn btn-primary">
        SEARCH
      </button>
      <Link to={"/products"} className="btn btn-accent">
        RESET
      </Link>
    </Form>
  );
};

export default Filter;
