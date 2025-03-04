import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const Hero = () => {
  const { products } = useLoaderData();

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tighter sm:text-6xl">
            Selamat Datang di StrideX
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            quas, beatae expedita exercitationem esse recusandae numquam iusto
            mollitia quasi reprehenderit.
          </p>
          <div className="mt-10">
            <Link to={"/products"} className="btn btn-primary">
              Product Kami
            </Link>
          </div>
        </div>

        <div className="hidden lg:carousel carousel-center bg-neutral rounded-box space-x-4 p-4">
          {products.map((product) => (
            <div className="carousel-item" key={product._id}>
              <img src={product.image} className="rounded-box max-w-64" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
