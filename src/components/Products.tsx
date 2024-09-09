import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, Product } from "../services/products";
import Brands from "../TextPages/Brands";
import News from "../TextPages/News";
import Loading from "./common/Loading";
import MultiSelect from "./common/MultiSelect";
import Pagination from "./common/Pagination";
import ProductsWrapper from "./common/ProductsWrapper";
import "./Products.scss";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const type = searchParams.get("type");
  const [products, setProducts] = React.useState<Product[]>([]);
  const [currentPage, setCurrentPage] = React.useState(
    page ? parseInt(page) : 1
  );
  const [currentType, setCurrentType] = React.useState(type ? type : "both");
  const [search, setSearch] = React.useState("");
  const [totalPages, setTotalPages] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [totalDocs, setTotalDocs] = React.useState(0);
  const [fetch, setFetch] = React.useState(false);

  useEffect(() => {
    if (!fetch) return;

    async function fetchPage(page: number) {
      setLoading(true);
      window.scrollTo(0, 0);
      const data = (await getProducts(page, 12, currentType, search)).data;
      setLoading(false);
      setProducts(data.docs);
      // console.log(data.docs);
      setTotalPages(data.totalPages);
      setTotalDocs(data.totalDocs);
      setFetch(false);
    }

    fetchPage(currentPage);
  }, [fetch]);

  useEffect(() => {
    const _search = searchParams.get("search") || "";
    const _type = searchParams.get("type") || "";
    if (_search && _search !== search) setSearch(_search);
    if (_type && _type !== currentType) setCurrentType(_type);
    changePage(1, _type, _search);
  }, [searchParams]);

  function changePage(page: number, type?: string, _search?: string) {
    setCurrentPage(page);

    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?page=" +
      page +
      "&type=" +
      (type ? type : currentType);
    if (search || _search) newurl += `&search=${_search || search}`;
    window.history.pushState({ path: newurl }, "", newurl);
    setFetch(true);
  }

  function changeType(type: string[]) {
    if (type[0] === currentType) return;
    setCurrentType(type[0]);
    changePage(1, type[0]);
  }

  return (
    <div id="products-screen">
      <div className="other-products">
        <h1 className="center advent">
          {currentType === "rent"
            ? "Rent"
            : currentType === "buy"
            ? "Buy"
            : "Browse"}{" "}
          Products
        </h1>
        <div className="flex title browse-opts wrap">
          <p></p>
          <MultiSelect
            type="radio"
            options={["rent", "buy", "both"]}
            onChange={changeType}
            label=""
            value={currentType}
            atleastOne={true}
          ></MultiSelect>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="">
            <ProductsWrapper products={products}></ProductsWrapper>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={changePage}
              totalDocs={totalDocs}
            ></Pagination>
          </div>
        )}
      </div>
      <Brands></Brands>
      <News n={3}></News>
    </div>
  );
}

export default Products;
