import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getProductsByUser,
  Product,
  archiveProduct,
} from "../services/products";
import { useAppSelector } from "../store/hooks";
import Button from "./common/Button";
import Loading from "./common/Loading";
import Popup from "./common/Popup";
import ProductsWrapper from "./common/ProductsWrapper";

function MyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const userId = useAppSelector((state) => state.user.user?._id);
  const [loading, setLoading] = useState(true);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [currentDeleteProduct, setCurrentDeleteProduct] =
    useState<Product | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  function openDeletePopup() {
    setDeletePopupOpen(true);
    setErrorMsg("");
  }

  function closeDeletePopup() {
    setDeletePopupOpen(false);
  }

  function handleDeleteClick(product: Product) {
    setCurrentDeleteProduct(product);
    openDeletePopup();
  }

  async function deleteProduct() {
    if (!currentDeleteProduct) return;
    setErrorMsg("");
    setDeleteLoading(true);

    const res = await archiveProduct(currentDeleteProduct._id);

    if (res.error) {
      setErrorMsg(res.message);
    } else {
      const newProducts = products.filter(
        (product) => product._id !== currentDeleteProduct._id
      );
      setProducts(newProducts);
      setCurrentDeleteProduct(null);
      closeDeletePopup();
    }
    setDeleteLoading(false);
  }

  useEffect(() => {
    if (!userId) return;
    setLoading(true);

    async function fetchProducts(userId: string) {
      try {
        const response = await getProductsByUser(userId);
        setProducts(response.data);
        setLoading(false);
        // console.log(products);
      } catch (e) {
        setLoading(false);
        throw e;
      }
    }
    fetchProducts(userId);
  }, [userId]);

  return (
    <div id="products-screen" className="myproducts">
      <div className="other-products">
        <div className="flex space-between align-items-center header">
          <h1 className="advent center">My Products</h1>
          <Link to="new">
            <button type="button" className="outline-btn">
              Add Product
            </button>
          </Link>
        </div>
        {loading && <Loading />}
        {products && (
          <ProductsWrapper
            myProduct={true}
            products={products}
            onDeleteClick={handleDeleteClick}
            onEditClick={(product) => {
              navigate("/profile/my-products/" + product._id);
            }}
          ></ProductsWrapper>
        )}
        {!loading && products.length === 0 && (
          <p className="center">No products in your list!</p>
        )}
      </div>
      {currentDeleteProduct && (
        <Popup open={deletePopupOpen} close={closeDeletePopup}>
          <h2 className="advent">
            Delete product - {currentDeleteProduct.name}
          </h2>
          <p>Are you sure you want to delete this product?</p>
          {errorMsg && (
            <>
              <br />
              <p className="error-msg">{errorMsg}</p>
            </>
          )}

          <div className="btn-wrapper flex">
            <Button
              className="outline-btn danger-btn"
              loading={deleteLoading}
              onClick={deleteProduct}
            >
              Confirm
            </Button>
            <button className="outline-btn" onClick={closeDeletePopup}>
              Cancel
            </button>
          </div>
        </Popup>
      )}
    </div>
  );
}

export default MyProducts;
