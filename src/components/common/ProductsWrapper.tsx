import { Product } from "../../services/products";
import ProductContainer from "./ProductContainer";
import "./ProductContainer.scss";

function ProductsWrapper({
  products,
  myProduct = false,
  onDeleteClick,
  onEditClick,
}: {
  myProduct?: boolean;
  products: Product[];
  onDeleteClick?: (product: Product) => void;
  onEditClick?: (product: Product) => void;
}) {
  return (
    <div className="products-wrapper">
      {products?.map((product) => {
        return (
          <ProductContainer
            key={product._id}
            product={product}
            myProduct={myProduct}
            onDeleteClick={onDeleteClick}
            onEditClick={onEditClick}
          ></ProductContainer>
        );
      })}
    </div>
  );
}

export default ProductsWrapper;
