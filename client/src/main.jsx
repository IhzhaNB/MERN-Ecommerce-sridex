import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { store } from "./store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="top-left" />
  </Provider>
);
