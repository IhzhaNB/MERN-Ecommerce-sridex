import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import Filter from "../components/Filter";
import CardProduct from "../components/CardProduct";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";

const Product = () => {
  const user = useSelector((state) => state.userState.user);

  const { products, pagination } = useLoaderData();

  return (
    <>
      <Filter />
      {user && user.role === "admin" && (
        <div className="flex justify-end">
          <Link to={"/product/create"} className="btn btn-secondary">
            Create Product
          </Link>
        </div>
      )}

      <h3 className="text-lg text-primary font-bold text-right my-3">
        Total: {pagination.totalProduct} Product
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {!products.length ? (
          <h1 className="text-2xl font-bold">Product Not Found</h1>
        ) : (
          products.map((product) => (
            <CardProduct key={product._id} product={product} user={user} />
          ))
        )}
      </div>
      <div className="mt-5 flex justify-center">
        <Pagination />
      </div>
    </>
  );
};

export default Product;
