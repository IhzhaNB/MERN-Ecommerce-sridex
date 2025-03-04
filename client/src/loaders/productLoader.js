import customAPI from "../services/customAPI";

export const homeLoader = async ({ request }) => {
  const { data } = await customAPI.get("/product?limit=3");
  return { products: data.data };
};

export const productViewLoader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  // console.log(params);

  const { data } = await customAPI.get("/product", { params });
  // console.log(data.data);

  return { products: data.data, params, pagination: data.pagination };
};
