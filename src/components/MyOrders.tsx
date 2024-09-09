import React, { Suspense, useEffect } from "react";
import { cancelUserOrder, getOrders } from "../services/orders";
import Loading from "./common/Loading";
import OrdersWrapper from "./common/OrdersWrapper";

function MyOrders() {
  const [loading, setLoading] = React.useState(true);
  const [orders, setOrders] = React.useState([]);
  const [fetchOrders, setFetchOrders] = React.useState(true);

  useEffect(() => {
    if (!fetchOrders) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    getOrders()
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });

    setFetchOrders(false);
  }, [fetchOrders]);

  async function cancelOrder(id: string) {
    const response = await cancelUserOrder(id);

    setFetchOrders(true);
    setLoading(true);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="orders-page">
      <h1 className="title advent">My Orders</h1>
      {!loading && orders.length === 0 && (
        <p className="  center">You have no Orders</p>
      )}
      <div className="orders">
        <OrdersWrapper
          orders={orders}
          cancelOrder={cancelOrder}
        ></OrdersWrapper>
      </div>
    </div>
  );
}

export default MyOrders;
