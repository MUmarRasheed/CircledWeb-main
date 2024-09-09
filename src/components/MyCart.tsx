import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  CartItem,
  removeFromCart,
  setCartItems,
} from "../store/slices/cartSlice";
import Button from "./common/Button";
import CloseIcon from "/assets/icons/close.svg";
import "./MyCart.scss";
import { deleteFromCart, getCart } from "../services/cart";
import Popup from "./common/Popup";
import Loading from "./common/Loading";
import { checkProductAvailability } from "../services/products";
import { useDispatch } from "react-redux";

function MyCart() {
  const cartData = useAppSelector((state) => state.cart);
  const cart = cartData.data;
  const loading = cartData.loading;
  const naviagte = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  const [someAvailable, setSomeAvailable] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCart() {
      const cart = await getCart();
      dispatch(setCartItems(cart.data.data));
    }

    fetchCart();
  }, []);

  function checkAllProducts() {
    let available = true;

    for (let i = 0; i < cart.length; i++) {
      available = available && checkProductAvailability(cart[i].product);
      if (!available) break;
    }

    if (available)
      naviagte("/orders/confirmation", { state: { cart, fromCart: true } });
    else {
      setSomeAvailable(cart.length > 1);
      setPopupOpen(true);
    }
  }

  function closePopup() {
    setPopupOpen(false);
  }

  function navigateToOrders() {
    const _cart = cart.filter((item) => checkProductAvailability(item.product));

    naviagte("/orders/confirmation", {
      state: { cart: _cart, fromCart: true },
    });
  }

  if (loading) return <Loading />;

  return (
    <div id="cart">
      <h1 className="advent title">My Cart {cart && `(${cart.length})`}</h1>
      {cart.length === 0 && (
        <div className="title">
          <p className="center">
            No items in your cart. Continue shopping to add more.
          </p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      )}
      <div className="category-container">
        {cart.map((item) => (
          <CartItemContainer item={item} key={item.product._id} />
        ))}
      </div>
      {cart.length > 0 && (
        // <Link to="/orders/confirmation" state={{ cart, fromCart: true }}>
        <Button onClick={checkAllProducts}>Checkout</Button>
        // </Link>
      )}

      <Popup open={popupOpen} close={closePopup}>
        {someAvailable ? (
          <div>
            <h2>Are you sure?</h2>
            <br />
            <p className="info">
              Some of the products are currently unavailable. Do you wish to
              checkout with the available items?
            </p>
            <br />
            <div className="btn-wrapper">
              <Button onClick={navigateToOrders}>Proceed</Button>
              <button className="outline-btn" onClick={close}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2>We are sorry!</h2>
            <br />
            <p className="error-msg">
              The items in your cart are currently unavailable. Please try again
              in few days.
            </p>
            <br />
            <br />
            <div className="btn-wrapper">
              <button className="outline-btn" onClick={closePopup}>
                Close
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}

function CartItemContainer({ item }: { item: CartItem }) {
  const dispatch = useAppDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  function closePopup() {
    if (deleting) return;
    setPopupOpen(false);
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const response = await deleteFromCart(item._id);
      dispatch(removeFromCart(item._id));
    } catch (e: any) {
      setErrorMsg(
        e.response?.data?.message || e.message || "Something went wrong."
      );
    }
    setDeleting(false);
  }

  return (
    <div className="cart-item wrap">
      <div className="split-1">
        <Link to={"/products/" + item.product._id}>
          <img src={item.product.images[0]} alt="" />
        </Link>
      </div>
      <div className="split-2">
        <Link to={"/products/" + item.product._id}>
          <h3>{item.product.name}</h3>
        </Link>
        <p>{item.product.category?.name}</p>
        {(item.color || item.size) && (
          <p>
            {item.color && item.color + " | "}
            {item.size}
          </p>
        )}
        <p
          className={
            checkProductAvailability(item.product) ? "avail" : "avail unavail"
          }
          style={{ position: "static", width: "fit-content" }}
        >
          {checkProductAvailability(item.product)
            ? "Available"
            : "Out of stock"}
        </p>
      </div>
      <div className="split-3">
        <img src={CloseIcon} alt="" onClick={() => setPopupOpen(true)} />
        <h4 className="cost">
          {/* RENT £43 - £106 | RETAIL £300 */}
          {(item.product.type === "both" || item.product.type === "rent") && (
            <span>RENT £{item.product.rentPrice}</span>
          )}
          {item.product.type === "both" && <span> | </span>}
          {(item.product.type === "both" || item.product.type === "buy") && (
            <span>RETAIL £{item.product.costPrice}</span>
          )}
        </h4>
      </div>
      {popupOpen && (
        <Popup open={popupOpen} close={closePopup}>
          <h1 className="advent">Delete {item.product.name} from cart?</h1>
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          <div className="btn-wrapper">
            <Button
              loading={deleting}
              className="danger-btn"
              onClick={handleDelete}
            >
              Delete
            </Button>
            {!deleting && (
              <button
                type="button"
                onClick={closePopup}
                className="outline-btn"
              >
                Close
              </button>
            )}
          </div>
        </Popup>
      )}
    </div>
  );
}

export default MyCart;
