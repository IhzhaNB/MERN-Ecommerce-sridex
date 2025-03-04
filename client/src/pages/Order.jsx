import { useLoaderData } from "react-router-dom";
import customAPI from "../services/customAPI";
import { priceFormat } from "../utils";

const Order = () => {
  const { orders } = useLoaderData();
  if (!orders.length)
    return (
      <h1 className="text-center text-primary font-bold text-3xl border-b border-secondary py-3">
        Order Not Found
      </h1>
    );
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <td>No.</td>
            <td>Order by</td>
            <td>Product</td>
            <td>Total</td>
            <td>Payment Status</td>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id} className="hover">
              <th>{index + 1}</th>
              <td>
                {order.firstName} {order.lastName}
              </td>
              <td>
                <ul className="list-disc">
                  {order.item_detail.map((itemProduct) => (
                    <li key={itemProduct.product} className="mb-3">
                      {itemProduct.name} <br />
                      <span className="font-bold">
                        Total: {itemProduct.quantity} product
                      </span>{" "}
                      <br />
                      {priceFormat(itemProduct.price)}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{priceFormat(order.total)}</td>
              <td>
                {order.status === "pending" ? (
                  <span className="btn btn-info">Pending</span>
                ) : order.status === "success" ? (
                  <span className="btn btn-success">Success</span>
                ) : (
                  <span className="btn btn-error">Failed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
