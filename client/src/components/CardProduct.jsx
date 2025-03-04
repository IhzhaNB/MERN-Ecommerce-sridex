import React from "react";
import { Link, useRevalidator } from "react-router-dom";
import { priceFormat } from "../utils";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import customAPI from "../services/customAPI";
import { toast } from "react-toastify";

const CardProduct = ({ product, user }) => {
  const { revalidate } = useRevalidator();
  return (
    <div className="card bg-base-300 shadow-xl" key={product._id}>
      <figure>
        <div className="relative">
          <img src={product.image} alt={product.name} />
          {product.stock < 1 && (
            <span className="absolute top-0 right-0 bg-error font-bold text-2xl">
              Sold Out
            </span>
          )}
        </div>
      </figure>
      <div className="card-body p-4">
        {user && user.role === "admin" && (
          <div className="flex justify-end gap-x-3">
            <FaTrash
              className="text-red-500 cursor-pointer"
              onClick={async () => {
                await customAPI.delete(`/product/${product._id}`);
                toast.info("Delete Product Success");
                revalidate();
              }}
            />
            <Link to={`/product/${product._id}/edit`}>
              <FaPencilAlt className="text-info cursor-pointer" />
            </Link>
          </div>
        )}

        <h2 className="text-sm md:text-2xl card-title text-primary ">
          {product.name}
        </h2>
        <p className="text-xs md:text-xl font-bold text-accent">
          {priceFormat(product.price)}
        </p>
        <p className="text-xs md:text-lg">
          {product.description.length > 50
            ? product.description.substring(0, 50) + "..."
            : product.description}
        </p>
        <div className="card-actions justify-end">
          <Link
            to={`/product/${product._id}`}
            className="btn btn-primary btn-xs mt-3 md:btn-md md:mt-5"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
