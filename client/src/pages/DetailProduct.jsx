import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";

import customAPI from "../services/customAPI";
import { priceFormat } from "../utils";
import { generateSelectAmount } from "../utils";
import { addItem } from "../features/cartSlice";

const DetailProduct = () => {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);

  // store
  const dispatch = useDispatch();

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const productCart = {
    cartId: product._id + product.name,
    productId: product._id,
    name: product.name,
    image: product.image,
    price: product.price,
    stock: product.stock,
    amount,
  };

  const handleCart = () => {
    dispatch(addItem({ product: productCart }));
  };

  const getDetailProduct = async () => {
    const { data } = await customAPI.get(`/product/${id}`);
    setProduct(data.data);
  };

  useEffect(() => {
    getDetailProduct();
  }, []);

  return (
    <div>
      <div className="card lg:card-side bg-base-300 shadow-xl">
        <figure>
          <div className="relative">
            <img src={product.image} alt={product.name} />
            {product.stock < 1 && (
              <span className="absolute top-0 right-0 bg-error font-bold text-4xl">
                Sold Out
              </span>
            )}
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <span className="text-3xl mt-2 font-bold text-accent">
            {priceFormat(product.price)}
          </span>
          <span className="mt-3 font-bold">Stok: {product.stock}</span>
          <span className="badge badge-primary">{product.category}</span>
          <p className="mt-3">{product.description}</p>
          <div className="card-actions justify-end">
            <div className="p-8 flex flex-col gap-y-4">
              {product.stock > 0 && (
                <>
                  <label htmlFor="" className="form-control">
                    <label htmlFor="" className="label">
                      <span className="capitalize label-text">Amount</span>
                    </label>
                    <select
                      name="amount"
                      className="select select-bordered"
                      onChange={handleAmount}
                    >
                      {generateSelectAmount(product.stock)}
                    </select>
                  </label>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleCart}
                  >
                    <FaPlus /> Keranjang
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
