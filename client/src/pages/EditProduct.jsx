import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import customAPI from "../services/customAPI";
import FormSelect from "../components/form/FormSelect";
import FormInput from "../components/form/FormInput";
import FormTextarea from "../components/form/FormTextarea";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const EditProduct = () => {
  const categories = ["", "sepatu", "baju", "celana", "kemeja", "jaket"];
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const getProductId = async () => {
    const { data } = await customAPI.get(`/product/${id}`);
    setProduct(data.data);
    console.log(data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const dataForm = new FormData(form);

    const data = Object.fromEntries(dataForm);
    try {
      // create product
      await customAPI.put(`/product/${id}`, {
        name: data.name,
        price: data.price,
        stock: data.stock,
        description: data.description,
        category: data.category,
      });
      toast.info("Update Product Success");
      navigate("/products");
    } catch (error) {
      const errMessage = error?.response?.data?.message;
      toast.error(errMessage);
    }
  };

  useEffect(() => {
    getProductId();
  }, []);

  return (
    <>
      {product ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <FormSelect
            name={"category"}
            label={"Select Category"}
            lists={categories}
            defaultValue={product.category}
          />
          <FormInput
            name={"name"}
            label={"Product Name"}
            type={"text"}
            defaultValue={product.name}
          />
          <FormInput
            name={"price"}
            label={"Product Price"}
            type={"number"}
            defaultValue={product.price}
          />
          <FormInput
            name={"stock"}
            label={"Product stock"}
            type={"number"}
            defaultValue={product.stock}
          />
          <FormTextarea
            name={"description"}
            label={"Product Description"}
            defaultValue={product.description}
          />
          <input
            type="submit"
            value={"Update"}
            className="btn btn-primary btn-block mt-5 btn-md"
          />
        </form>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EditProduct;
