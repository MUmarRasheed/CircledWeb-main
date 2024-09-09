import "./ProductContainer.scss";
import { Link } from "react-router-dom";
import { Product } from "../../services/products";

function ProductContainer({
  product,
  myProduct,
  onDeleteClick,
  onEditClick,
}: {
  myProduct?: boolean;
  product: Product;
  onDeleteClick?: (product: Product) => void;
  onEditClick?: (product: Product) => void;
}) {
  return (
    <div className="producta-container">
      <Link to={"/products/" + product._id}>
        <div className="productz-img">
          <img src={product.images[0]} alt="" />
        </div>
        <div className="pro-info center">
          <h3>{product.name}</h3>
          <p>
            {product.category?.name && product.category?.name + " | "}{" "}
            {product.sizes?.length + " size"}
          </p>
          <p>
            {(product.type === "both" || product.type === "rent") && (
              <span>RENT £{product.rentPrice}</span>
            )}
            {product.type === "both" && <span> | </span>}
            {(product.type === "both" || product.type === "buy") && (
              <span>RETAIL £{product.retailPrice}</span>
            )}
          </p>
        </div>
        <div className="flex grp-tags">
          {(!myProduct || (myProduct && !product.isDeleted)) && (
            <p
              className={
                "avail " +
                (product.stock === 0 || product.isDeleted ? "unavail" : "")
              }
            >
              {product.stock === 0 || product.isDeleted
                ? "Out of Stock"
                : "Available"}
            </p>
          )}
          {myProduct && product.isDeleted && (
            <p className={"avail unavail"}>Archived</p>
          )}
        </div>
      </Link>
      {myProduct && !product.isDeleted && (
        <div className="pro-actions">
          <p className="center">
            Stock : <strong>{product.stock}</strong>
          </p>
          <div className="action-btns flex">
            {onEditClick && (
              <button
                className="outline-btn"
                onClick={() => onEditClick(product)}
              >
                Edit
              </button>
            )}
            {onDeleteClick && (
              <button
                className="outline-btn danger-btn"
                onClick={() => onDeleteClick(product)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductContainer;
