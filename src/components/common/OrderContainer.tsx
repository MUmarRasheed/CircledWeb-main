import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { OrderStatus } from "../../services/orders";
import { Product } from "../../services/products";
import { Address } from "../../store/slices/addressSlice";
import "./OrderContainer.scss";

function getTomorrow(date?: Date | null) {
  var currentDate = date ? new Date(date) : new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  return currentDate;
}

function OrderContainer({
  product,
  color,
  type,
  size,
  fromDate,
  toDate,
  quantity,
  pickDate = false,
  pickType = false,
  changeType,
  onDateChange,
  onQuantityChange,
  pickQuantity = false,
  maxQuantity = 1,
  status,
  address,
  cancelOrder,
  updateStatus,
}: {
  product: Product;
  color: string;
  type: "rent" | "buy";
  size: string;
  quantity?: number;
  fromDate?: Date;
  toDate?: Date;
  pickDate: boolean;
  status?: number;
  address?: Address;
  pickQuantity: boolean;
  onQuantityChange?: (quantity: number) => void;
  maxQuantity?: number;
  onDateChange?: (from: Date, end: Date) => void;
  cancelOrder?: (() => void) | null;
  updateStatus?: (() => void) | null;
  pickType?: boolean;
  changeType?: (val: "buy" | "rent") => void;
}) {
  const [_fromDate, _setFromDate] = React.useState<Date>(
    fromDate || new Date()
  );
  const [_toDate, _setToDate] = React.useState<Date>(toDate || getTomorrow());
  const [_quantity, _setQuantity] = React.useState(quantity || 1);

  useEffect(() => {
    if (pickDate) {
      onDateChange && onDateChange(_fromDate, _toDate);
    }
    if (pickQuantity) {
      onQuantityChange && onQuantityChange(_quantity);
    }
  }, []);

  function changeDate(type: "start" | "end", date: Date) {
    if (type === "start") {
      // check if date is greater than today
      if (date < new Date()) {
        return;
      }

      _setFromDate(date);
      if (date >= _toDate) {
        let t = getTomorrow(date);
        _setToDate(t);
        onDateChange && onDateChange(date, t);
      } else {
        onDateChange && onDateChange(date, _toDate);
      }
    } else {
      if (date < _fromDate) {
        return;
      }

      _setToDate(date);
      onDateChange && onDateChange(_fromDate, date);
    }
  }

  function getTotalDays() {
    return Math.ceil(
      (_toDate.getTime() - _fromDate.getTime()) / (1000 * 3600 * 24)
    );
  }

  return (
    <div className="order-container">
      <div className="pro-wrapper flex">
        <div className="pro-info flex">
          <div className="order-img">
            <img src={product.images[0]} alt="" id="pro-img" />
          </div>
          <div className="order-info1">
            <Link to={"/products/" + product._id}>
              <h2 className="advent">{product.name}</h2>
            </Link>
            {(color || size) && (
              <p>
                {color ? color + " | " : ""}
                {size}
              </p>
            )}
            <p>
              Type: <span id="buy-type">{type}</span>
            </p>
            <p>
              {type === "rent" ? "Rental Cost Per Day" : "Product cost"}:{" "}
              <span id="buy-type">
                £ {type === "rent" ? product.rentPrice : product.retailPrice}
              </span>
            </p>
            {quantity && (
              <p>
                Quantity: <span id="buy-type">{quantity}</span>
              </p>
            )}
          </div>
        </div>
        <div className="total-cost-info">
          {type === "rent" ? (
            <p>
              Total Rental Cost :{" "}
              <span className="cost-text">
                £ {product.rentPrice * getTotalDays() * _quantity}
              </span>
            </p>
          ) : (
            <p>
              Total Product Cost :
              <span className="cost-text">
                £ {product.retailPrice * _quantity}
              </span>
            </p>
          )}

          {/* <p>
            Tax : <span className="cost-text">£ 40</span>
          </p> */}
          {/* <p>
            {status !== null ? "Amount Paid" : "Amount Payable"} :
            <span className="cost-text">
              £{" "}
              {type === "rent"
                ? product.rentPrice * getTotalDays() * _quantity + 40
                : product.retailPrice * _quantity + 40}
            </span>
          </p> */}
        </div>
      </div>
      {(type === "rent" || pickType) && (
        <div className="order-info flex">
          <div className="grp flex left-picker">
            {pickQuantity && (
              <div className="date-picker__item quantity-picker flex">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  value={_quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value < 1) {
                      return;
                    }
                    if (value > maxQuantity) {
                      return;
                    }
                    _setQuantity(value);
                    onQuantityChange && onQuantityChange(value);
                  }}
                />
              </div>
            )}
            {pickType && (
              <div className="date-picker__item" id="type-picker">
                <label htmlFor="from">Type</label>
                <select
                  value={type}
                  onChange={(e) =>
                    changeType && changeType(e.target.value as any)
                  }
                >
                  <option value="buy">Buy</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
            )}
          </div>

          {type === "rent" && (
            <div className="left-picker flex">
              {pickDate ? (
                <div className="date-picker flex">
                  <div className="date-picker__item">
                    <label htmlFor="from">From</label>
                    <input
                      type="date"
                      id="from"
                      value={_fromDate?.toISOString().split("T")[0]}
                      onChange={(e) =>
                        changeDate("start", new Date(e.target.value))
                      }
                    />
                  </div>
                  <div className="date-picker__item">
                    <label htmlFor="to">To</label>
                    <input
                      type="date"
                      id="to"
                      value={_toDate?.toISOString().split("T")[0]}
                      onChange={(e) =>
                        changeDate("end", new Date(e.target.value))
                      }
                    />
                  </div>
                </div>
              ) : (
                <div className="date-info flex">
                  <p>
                    From:{" "}
                    <span className="cost-text-1">
                      {fromDate?.toDateString()}
                    </span>
                  </p>
                  <p>
                    To:{" "}
                    <span className="cost-text-1">
                      {toDate?.toDateString()}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}

          {type === "rent" && (
            <p id="total-days">
              Total Renting Period :{" "}
              <span className="cost-text">
                {getTotalDays()} day{getTotalDays() !== 1 && "s"}
              </span>
            </p>
          )}
        </div>
      )}
      {status !== null && (
        <div>
          {status !== null && status !== undefined && (
            <div className="address-status flex">
              <div className="status">
                <h4>Status</h4>
                <p>{OrderStatus[status]}</p>
              </div>
              {status < 3 && cancelOrder && (
                <button
                  className="outline-btn"
                  onClick={() => {
                    cancelOrder && cancelOrder();
                  }}
                >
                  Cancel Order
                </button>
              )}
              {status < 4 && updateStatus && (
                <button
                  className="outline-btn update-btn"
                  onClick={() => {
                    updateStatus && updateStatus();
                  }}
                >
                  Update Status
                </button>
              )}
            </div>
          )}
          {address && (
            <div className="address-status">
              <div className="address-info">
                <h4>Delivery Location</h4>
                <div className="flex address-choose">
                  <div className="address">
                    <p>
                      {address.street} ,{address.city} - {address.pinCode}.
                      Phone: {address.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderContainer;
