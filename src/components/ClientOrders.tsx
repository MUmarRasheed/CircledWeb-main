import React, { useEffect, useState } from "react";
import {
  getClientOrders,
  Order,
  OrderStatus,
  updateOrderStatus as updateOrderStatusInServer,
} from "../services/orders";
import Button from "./common/Button";
import Loading from "./common/Loading";
import OrdersWrapper from "./common/OrdersWrapper";
import Popup from "./common/Popup";

function ClientOrders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState(-1);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [actionCompleted, setActionCompleted] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      const response = await getClientOrders();
      // console.log(response);
      setLoading(false);
      setOrders(response.data.data);
    }

    fetchOrders();
  }, []);

  function updateOrderStatus(id: String) {
    const order = orders.filter((order: Order) => order._id === id)[0];
    setSelectedOrder(order);
    setPopupOpen(true);
    setNewStatus(-1);
    setErrorMessage("");
    setSuccessMsg("");
    setActionCompleted(false);
  }

  async function handleUpdate() {
    if (!selectedOrder) return;

    setUpdateLoading(true);
    setErrorMessage("");
    setSuccessMsg("");

    if (newStatus === -1) {
      setErrorMessage("Select an status to update");
      return;
    }

    const res = await updateOrderStatusInServer(selectedOrder?._id, newStatus);

    if (!res.error) {
      setSuccessMsg("Order Status Updated Successfully");
      setActionCompleted(true);

      selectedOrder.status = newStatus;
    } else {
      setErrorMessage(res.message);
    }

    setUpdateLoading(false);
  }

  function closePopup() {
    setPopupOpen(false);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="orders-page">
      <h1 className="title advent">Client Orders</h1>
      {!loading && orders.length === 0 && (
        <p className="  center">You have no Orders</p>
      )}
      <div className="orders">
        <OrdersWrapper
          orders={orders}
          updateStatus={updateOrderStatus}
        ></OrdersWrapper>
      </div>
      <Popup open={popupOpen} close={closePopup}>
        {selectedOrder && (
          <div>
            <h1 className="advent">Update order status</h1>
            <br />
            <p>
              Current Order status : <br />
            </p>
            <p>
              <strong>{OrderStatus[selectedOrder.status]}</strong>
            </p>
            <br />
            {errorMessage && (
              <>
                <p className="error-msg">{errorMessage}</p>
                <br />
              </>
            )}
            {successMsg && (
              <>
                <p className="error-msg success-msg">{successMsg}</p>
                <br />
              </>
            )}
            {!actionCompleted && (
              <>
                <p>Update Order status to:</p>
                <select
                  name="newOrderStatus"
                  id=""
                  value={newStatus}
                  onChange={(e) => {
                    setNewStatus(parseInt(e.target.value));
                  }}
                >
                  <option value="-1" disabled>
                    Select Status
                  </option>
                  {Object.keys(OrderStatus)
                    .map((i) => parseInt(i))
                    .filter((i) => i > selectedOrder.status && i !== 4)
                    .map((status) => {
                      return (
                        <option key={"interstellar-" + status} value={status}>
                          {OrderStatus[status]}
                        </option>
                      );
                    })}
                </select>
                <br />
                <br />
                <Button loading={updateLoading} onClick={handleUpdate}>
                  Update Status
                </Button>
              </>
            )}{" "}
          </div>
        )}
      </Popup>
    </div>
  );
}

export default ClientOrders;
