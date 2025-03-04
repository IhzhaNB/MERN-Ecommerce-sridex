import CardProduct from "../components/CardProduct";
import { useLoaderData } from "react-router-dom";
import Hero from "../components/Hero";

const Home = () => {
  const { products } = useLoaderData();

  return (
    <>
      <div>
        <Hero />
      </div>
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">Product List</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {products.map((product) => (
          <CardProduct key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
