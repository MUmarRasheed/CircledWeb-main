import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import CategoryContainer from "./common/CategoryContainer";

function AllCategories() {
  const categories = useAppSelector((state) => state.category.data);
  const navigate = useNavigate();

  return (
    <div id="all-categories">
      <h1 className="advent center title">Clothing</h1>
      <div className="category-container flex">
        {categories?.map((category, i: number) => (
          <CategoryContainer
            category={category}
            key={category._id}
            onClick={(category) => {
              navigate("/browse/" + category._id);
            }}
            showHelp={true}
          ></CategoryContainer>
        ))}
      </div>
    </div>
  );
}

export default AllCategories;
