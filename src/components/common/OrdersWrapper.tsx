import { Order } from "../../services/orders";
import OrderContainer from "./OrderContainer";

function OrdersWrapper({
  orders,
  cancelOrder,
  updateStatus,
}: {
  orders: Order[];
  cancelOrder?: (id: string) => void;
  updateStatus?: (id: string) => void;
}) {
  return (
    <div>
      {orders.map((order) => (
        <div key={order._id}>
          <OrderContainer
            color={order.color}
            pickDate={false}
            pickQuantity={false}
            product={order.product}
            size={order.size}
            type={order.type}
            quantity={order.quantity}
            fromDate={new Date(order.from)}
            toDate={new Date(order.to)}
            status={order.status}
            address={order.address}
            cancelOrder={
              cancelOrder
                ? () => {
                    cancelOrder(order._id);
                  }
                : null
            }
            updateStatus={
              updateStatus
                ? () => {
                    updateStatus(order._id);
                  }
                : null
            }
          ></OrderContainer>
        </div>
      ))}
    </div>
  );
}

export default OrdersWrapper;
