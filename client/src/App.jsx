import { createBrowserRouter, RouterProvider } from "react-router-dom";

// component
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login, { action as LoginAction } from "./pages/auth/Login";
import Register, { action as RegisterAction } from "./pages/auth/Register";
import Order from "./pages/Order";
import DetailProduct from "./pages/DetailProduct";
import Checkout from "./pages/Checkout";
import ErrorView from "./pages/ErrorView";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";

import { store } from "./store";

// loader
import { homeLoader, productViewLoader } from "./loaders/productLoader";

import { userLoader } from "./loaders/userLoader";
import { orderLoader } from "./loaders/orderLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },

      {
        path: "products",
        element: <Product />,
        loader: productViewLoader,
      },
      {
        path: "product/create",
        element: <CreateProduct />,
      },
      {
        path: "product/:id/edit",
        element: <EditProduct />,
      },
      {
        path: "product/:id",
        element: <DetailProduct />,
      },
      {
        path: "orders",
        element: <Order />,
        loader: orderLoader(store),
      },
      {
        path: "checkout",
        element: <Checkout />,
        loader: userLoader(store),
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: LoginAction(store),
  },
  {
    path: "/register",
    element: <Register />,
    action: RegisterAction(store),
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
