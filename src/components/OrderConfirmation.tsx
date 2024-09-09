import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Product } from "../services/products";
import { Address } from "../store/slices/addressSlice";
import _404 from "./404";
import AddressList from "./AddressList";
import Button from "./common/Button";
import Loading from "./common/Loading";
import OrderContainer from "./common/OrderContainer";
import Popup from "./common/Popup";
import "./OrderConfirmation.scss";

interface PreOrder {
  product: Product;
  color: string;
  type: "rent" | "buy";
  size: string;
  quantity: number;
  startDate: Date;
  endDate: Date;
}

function getTomorrow() {
  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  return currentDate;
}

function OrderConfirmation() {
  const location: {
    state: {
      cart: {
        product: Product;
        color: string;
        type: "rent" | "buy" | null;
        size: string;
        quantity: number | null;
        startDate: Date | null;
        endDate: Date | null;
      }[];
      fromCart: boolean;
    };
  } = useLocation();

  const [address, setAddress] = React.useState<Address | null>(null);
  const [addressPopupOpen, setAddressPopupOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [state, setState] = React.useState<PreOrder[]>([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const [gross, setGross] = useState({
    error: false,
    cost: 0,
    quantity: 0,
  });

  useEffect(() => {
    const _state: PreOrder[] = [];

    location.state.cart?.forEach((s) => {
      _state.push({
        ...s,
        type: s.type
          ? s.type
          : s.product.type === "both"
          ? "rent"
          : s.product.type,
        quantity: s.quantity || 1,
        startDate: s.startDate || new Date(),
        endDate: s.endDate || getTomorrow(),
      });
    });

    // console.log(_state);
    setState(_state as any);
    setLoading(false);
  }, []);

  useEffect(() => {
    // console.log(getGross());
    setGross(getGross());
  }, [state]);

  function handleTypeChange(id: string, type: "buy" | "rent") {
    const newState = structuredClone(state);

    newState.map((s) => {
      if (s.product._id !== id) return s;
      s.type = type;
      return s;
    });

    setState(newState);
  }

  function handleDateChange(id: string, from: Date, to: Date) {
    const newState = structuredClone(state);

    newState.map((s) => {
      if (s.product._id !== id) return s;
      s.startDate = from;
      s.endDate = to;

      return s;
    });

    // console.log(newState);
    setState(newState);
  }

  function handleQuantityChange(id: string, q: number) {
    const newState = structuredClone(state);

    newState.map((s) => {
      if (s.product._id !== id) return s;
      s.quantity = q;

      return s;
    });

    setState(newState);
  }

  function getTotalDays(from: Date, to: Date) {
    return Math.ceil((to.getTime() - from.getTime()) / (1000 * 3600 * 24));
  }

  function getGross() {
    let sum = 0,
      q = 0,
      error = false;

    for (let i = 0; i < state.length; i++) {
      let item = state[i];
      q += item.quantity;

      // console.log(sum);

      if (item.type === "buy") {
        sum += item.product.retailPrice * item.quantity;
      } else if (item.type === "rent") {
        if (!item.startDate || !item.endDate) {
          setError("Pick renting days to proceed.");
          error = true;
        } else {
          sum +=
            item.product.rentPrice *
            getTotalDays(item.startDate, item.endDate) *
            item.quantity;
        }
      }
    }

    return { cost: sum, quantity: q, error };
  }

  function closeAddressPopup() {
    setAddressPopupOpen(false);
  }

  if (loading) return <Loading />;

  if (!location.state || !location.state?.cart) return <_404 />;

  return (
    <div id="order-confirm">
      <h1 className="center advent title">Confirm Your Order</h1>
      <div className="order-content">
        {state.map((item) => (
          <OrderContainer
            product={item.product}
            color={item.color}
            type={item.type || "buy"}
            size={item.size}
            pickDate={true}
            pickType={item.product.type === "both"}
            onDateChange={(from, to) =>
              handleDateChange(item.product._id, from, to)
            }
            pickQuantity={true}
            maxQuantity={item.product.stock}
            onQuantityChange={(quantity: any) =>
              handleQuantityChange(item.product._id, parseInt(quantity))
            }
            changeType={(type: "buy" | "rent") =>
              handleTypeChange(item.product._id, type)
            }
          />
        ))}
        {error && <p className="error-msg max-500">{error}</p>}
        <div className="delivary-location">
          <h3>Delivery Location</h3>
          <div className="flex address-choose">
            {address ? (
              <div className="address">
                <h4>{address.street}</h4>
                <p>
                  {address.city} - {address.pinCode}
                </p>
                <p>Phone: {address.phone}</p>
              </div>
            ) : (
              <p>No address selected</p>
            )}
            <button
              className="outline-btn"
              onClick={() => setAddressPopupOpen(true)}
            >
              {address ? "Change" : "Pick an Address"}
            </button>
          </div>
        </div>

        <>
          <div className="summary max-500">
            <h3>In Order</h3>
            <p>
              {state.length} items in total, Quantity {gross.quantity}
            </p>

            {!gross.error && (
              <div className="cost-info-total">
                <div className="cost-contento flex">
                  <p>Subtotal</p>
                  <p className="bold-600">£ {gross.cost}</p>
                </div>
                <div className="cost-contento flex">
                  <p>Tax</p>
                  <p className="bold-600">£ 40</p>
                </div>
                {/* <div className="cost-contento flex">
                  <p>Delivery Charges</p>
                  <p className="bold-600">£ 10</p>
                </div> */}
                <div className="cost-contento flex">
                  <p>Gross Total</p>
                  <p className="bold-600">£ {gross.cost + 40}</p>
                </div>
              </div>
            )}
          </div>

          <Button
            disabled={gross.error}
            onClick={() => {
              if (!address) {
                setError("Choose an address to proceed");
                return;
              }
              navigate("payment", {
                state: {
                  orders: state,
                  address,
                  amount: getGross().cost + 40,
                  fromCart: location.state.fromCart,
                },
              });
            }}
          >
            Proceed to Payment
          </Button>
        </>
      </div>
      <Popup open={addressPopupOpen} close={closeAddressPopup}>
        <div className="address-choose-wrap">
          <AddressList
            selected={address}
            selector={(address) => {
              setAddress(address);
              setError("");
              closeAddressPopup();
            }}
          ></AddressList>
        </div>
      </Popup>
    </div>
  );
}

export default OrderConfirmation;
