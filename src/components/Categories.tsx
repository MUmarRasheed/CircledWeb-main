import React from "react";
import { useAppSelector } from "../store/hooks";
import CategoryContainer from "./common/CategoryContainer";

function Categories() {
  const categories = useAppSelector((state) => state.category.data);

  return (
    <div id="products-screen">
      <div className="other-products">
        <h1 className="advent center">Browse by categories</h1>

        <div className="products-wrapper">
          {categories.map((category) => (
            <CategoryContainer
              category={category}
              key={category._id}
              showHelp={true}
            ></CategoryContainer>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
