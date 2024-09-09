import { Suspense, useEffect, useState } from "react";
import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import locationIcon from "/assets/icons/location.svg";
import StarIcon from "/assets/icons/star.svg";
import {
  checkProductAvailability,
  getProductById,
  Product,
} from "../services/products";
import Button from "./common/Button";
import ExpandableText from "./common/ExpandableText";
import Avatar from "/assets/avtar.png";

import "./ViewProduct.scss";
import MultiSelect from "./common/MultiSelect";
import Loading from "./common/Loading";
import ProductsWrapper from "./common/ProductsWrapper";
import { addToCart as addToCartServer } from "../services/cart";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";

const stars = 5;

function ViewProduct() {
  const product: any = useLoaderData();
  const [imageIndex, setImageIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cart.data);
  const dispatch = useAppDispatch();
  const [cartLoading, setCartLoading] = useState(false);

  async function addItemToCart(id: string) {
    setCartLoading(true);
    try {
      const res = await addToCartServer({ product: id, size, color });
      // console.log(res);
      dispatch(addToCart(res.data?.data));
      setSuccessMsg(res.data?.message || "Product added to cart");
    } catch (e: any) {
      // console.log(e, id);
      setErrorMessage(
        e.response?.data?.message ||
          e.message ||
          "Something went wrong while adding to cart."
      );
    }
    setCartLoading(false);
  }

  return (
    <div id="view-product">
      <Suspense fallback={<Loading />}>
        <Await resolve={product.data}>
          {(data: { data: Product; status: boolean }) => {
            const product = data.data;

            // console.log(product);

            function performAction(type: "buy" | "rent" | "addToCart") {
              setErrorMessage("");
              setSuccessMsg("");

              if (product.sizes && product.sizes.length !== 0 && size === "") {
                setErrorMessage("Please select a size");
                return;
              }
              if (
                product.colors &&
                product.colors.length !== 0 &&
                color === ""
              ) {
                setErrorMessage("Please select a color");
                return;
              }

              if (type === "addToCart") {
                addItemToCart(product._id);
                return;
              }

              const state = {
                cart: [{ product, type, size, color }],
                fromCart: false,
              };

              navigate("/orders/confirmation", { state });
            }

            return (
              <div>
                <div className="pro-right hide">
                  <h1 className="advent">{product.name}</h1>
                  {/* <h3>BONDED CREPE BOW MINI DRESS</h3> */}
                  <div className="flex tags">
                    {(product.type === "both" || product.type === "buy") && (
                      <div className="tag">
                        <p>BUY</p>
                      </div>
                    )}
                    {(product.type === "both" || product.type === "rent") && (
                      <div className="tag">
                        <p>RENT</p>
                      </div>
                    )}
                  </div>
                  <h5 className="cost">
                    {/* RENT £43 - £106 | RETAIL £300 */}
                    {(product.type === "both" || product.type === "rent") && (
                      <span>RENT £{product.rentPrice}</span>
                    )}
                    {product.type === "both" && <span> | </span>}
                    {(product.type === "both" || product.type === "buy") && (
                      <span>RETAIL £{product.retailPrice}</span>
                    )}
                  </h5>
                </div>
                <div className="pro-left">
                  <div className="pro-img">
                    <img src={product.images?.at(imageIndex)} alt="product" />
                    <p
                      id="avail"
                      className={
                        product.stock === 0 || product.isDeleted
                          ? "unavail"
                          : ""
                      }
                    >
                      {product.stock === 0 || product.isDeleted
                        ? "Out of Stock"
                        : "Available"}
                    </p>
                  </div>
                  <div className="other-imgs wrap">
                    {product?.images.map((image, index) => (
                      <img
                        src={image}
                        alt="product"
                        key={"image" + index}
                        onClick={() => setImageIndex(index)}
                        className={imageIndex === index ? "active-image" : ""}
                      />
                    ))}
                  </div>
                  {product.user?.address && (
                    <div className="flex location">
                      <img src={locationIcon} />
                      <p>{product.user?.address}</p>
                    </div>
                  )}
                  {/* <a href="#" id="problem">
                    I have a problem
                  </a> */}
                </div>
                <div className="pro-right">
                  <div className="hide-mobile">
                    <h1 className="advent">{product.name}</h1>
                    {/* <h3>BONDED CREPE BOW MINI DRESS</h3> */}
                    <div className="flex tags">
                      {(product.type === "both" || product.type === "buy") && (
                        <div className="tag">
                          <p>BUY</p>
                        </div>
                      )}
                      {(product.type === "both" || product.type === "rent") && (
                        <div className="tag">
                          <p>RENT</p>
                        </div>
                      )}
                    </div>
                    <h5 className="cost">
                      {/* RENT £43 - £106 | RETAIL £300 */}
                      {(product.type === "both" || product.type === "rent") && (
                        <span>RENT £{product.rentPrice}</span>
                      )}
                      {product.type === "both" && <span> | </span>}
                      {(product.type === "both" || product.type === "buy") && (
                        <span>RETAIL £{product.retailPrice}</span>
                      )}
                    </h5>
                  </div>
                  {errorMessage && <p className="error-msg">{errorMessage}</p>}
                  {successMsg && (
                    <p className="error-msg success-msg">{successMsg}</p>
                  )}
                  <div className="size">
                    <div className="choose-wrap">
                      {product.sizes && product.sizes.length !== 0 && (
                        <div className="size-dropdown flex">
                          <MultiSelect
                            label="Available Sizes"
                            options={product.sizes || []}
                            onChange={(data) => setSize(data[0])}
                            type="radio"
                          ></MultiSelect>
                          {/* <p id="size-guide"> SIZE GUIDE</p> */}
                        </div>
                      )}
                      {product.colors && product.colors.length !== 0 && (
                        <div className="size-dropdown flex">
                          <MultiSelect
                            label="Available Colors"
                            options={product.colors || []}
                            onChange={(data) => setColor(data[0])}
                            type="radio"
                          ></MultiSelect>
                        </div>
                      )}
                    </div>
                    <div className="actions-wrap">
                      <div className="actions flex">
                        {product.stock > 0 &&
                          !product.isDeleted &&
                          (product.type === "both" ||
                            product.type === "buy") && (
                            <Button onClick={() => performAction("buy")}>
                              BUY NOW
                            </Button>
                          )}
                        {product.stock > 0 &&
                          !product.isDeleted &&
                          (product.type === "both" ||
                            product.type === "rent") && (
                            <Button onClick={() => performAction("rent")}>
                              RENT NOW
                            </Button>
                          )}
                      </div>
                      {checkProductAvailability(product) &&
                        (cart.filter((item) => {
                          return item.product._id === product._id;
                        }).length === 0 ? (
                          <Button
                            onClick={() => performAction("addToCart")}
                            loading={cartLoading}
                            id="cartBtn"
                            className="outline-btn"
                          >
                            Add To Cart
                          </Button>
                        ) : (
                          <button
                            className="outline-btn"
                            onClick={() => navigate("/cart")}
                            id="cartBtn"
                          >
                            Go to Cart
                          </button>
                        ))}
                    </div>

                    <div className="desc">
                      {/* <h3>Description</h3> */}
                      <p>
                        {product.description}
                        <br />
                        {/* <span className="show-more">show more</span> */}
                      </p>
                    </div>
                    <div className="seller-info">
                      <div className="seller">
                        <img
                          src={product?.user?.image || Avatar}
                          id="profile-pic"
                        />
                        <div className="seller-right">
                          <p className="bold-500">{product.user?.name}</p>
                          <div className="flex stars">
                            {[...Array(stars)].map((_, i) => {
                              return <img src={StarIcon} key={"star-" + i} />;
                            })}
                            {/* <span>4.5 (10)</span> */}
                          </div>
                        </div>
                      </div>
                      <div className="message-btn">
                        <Link to={"/chat/start/" + product.user?._id}>
                          <Button>MESSAGE</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <ExpandableText
                    title="Style Notes"
                    content={product.styleNotes}
                  ></ExpandableText>
                  <ExpandableText title="Colors"></ExpandableText>
                  <ExpandableText title="Size & Fit"></ExpandableText>
                  <ExpandableText title="Reviews"></ExpandableText>
                  <ExpandableText title="Comments"></ExpandableText>
                  <ExpandableText title="Rate Article"></ExpandableText>
                  {/* <ExpandableText title="Colors"></ExpandableText> */}
                  {/* <ExpandableText title="Size & Fit"></ExpandableText>
                  <ExpandableText title="Reviews"></ExpandableText>
                  <ExpandableText title="Comments"></ExpandableText>
                  <ExpandableText title="Rate Article"></ExpandableText> */}
                </div>
                <div className="clear"></div>
                <div className="other-products">
                  <h1 className="advent center">See more Products</h1>
                  <ProductsWrapper
                    products={product?.relatedProducts || []}
                  ></ProductsWrapper>
                </div>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}

export function productLoader({ params }: any) {
  return defer({ data: getProductById(params.id) });
}

export default ViewProduct;
