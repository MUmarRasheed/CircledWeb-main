import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { clearFromCart } from "../services/cart";
import { orderData, placeOrders } from "../services/orders";
import { useAppDispatch } from "../store/hooks";
import { emptyCart } from "../store/slices/cartSlice";
import _404 from "./404";
import Loading from "./common/Loading";

function CompleteOrder() {
  // get payment intent from local storage

  const [searchParams, _] = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const data: any = JSON.parse(localStorage.getItem("paymentIntent")!) || {};
    setData(data);

    if (!data || !data.id || data.id !== paymentIntent) {
      return;
    }
  }, []);

  useEffect(() => {
    if (data && data.state) handlePayment();
  }, [data]);

  async function handlePayment() {
    const state = data?.state;
    // console.log(data, state);
    localStorage.removeItem("paymentIntent");
    localStorage.removeItem("orderState");

    if (!state) return;

    const orders: orderData[] = [];

    state.orders.forEach((order: any) => {
      orders.push({
        type: order.type,
        color: order.color,
        size: order.size,
        product: order.product._id,
        from: order.startDate,
        to: order.endDate,
        seller: order.product.user._id,
        address: state.address._id,
        quantity: order.quantity,
      });
    });

    const response = await placeOrders(orders);

    if (response.error) {
      setError(response.message);
      return;
    }

    try {
      await clearFromCart();
      dispatch(emptyCart());
    } catch (e: any) {
      console.log(e);
    }

    navigate("/profile/my-orders");
  }

  if (data?.id !== paymentIntent) {
    // redirect to 404
    return <_404 />;
  }

  return (
    <div>
      <h1 className="advent title center">
        {error
          ? "Something went wrong with placing your order."
          : "Thank you for your order!"}
      </h1>
      {!error && (
        <>
          <p className="center">Processing... Please Wait</p>
          <Loading />
        </>
      )}
      {error && (
        <>
          <p className="error-msg max-500">
            {error}. Please get in touch with our support team.
          </p>
          <br />
          <br />
        </>
      )}
    </div>
  );
}

export default CompleteOrder;
