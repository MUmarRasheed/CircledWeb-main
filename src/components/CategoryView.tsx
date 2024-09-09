import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getProductsByCategory } from "../services/products";
import Brands from "../TextPages/Brands";
import News from "../TextPages/News";
import Loading from "./common/Loading";
import ProductsWrapper from "./common/ProductsWrapper";

function CategoryView() {
  const products: any = useLoaderData();

  return (
    <div id="category-browse">
      <Suspense fallback={<Loading />}>
        <Await resolve={products.data}>
          {(data: any) => {
            const products = data.data;
            return (
              <div>
                <h1 className="advent center title">
                  {products[0].category.name}
                </h1>
                <ProductsWrapper products={products} />
              </div>
            );
          }}
        </Await>
      </Suspense>
      <Brands></Brands>
      <News n={3}></News>
    </div>
  );
}

export async function categoryLoader({ params }: any) {
  return defer({ data: getProductsByCategory(params.id) });
}

export default CategoryView;
