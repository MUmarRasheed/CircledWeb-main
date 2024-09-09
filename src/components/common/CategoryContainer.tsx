import "./ProductContainer.scss";
import { Link, useNavigate } from "react-router-dom";
import { Category } from "../../services/products";

function CategoryContainer({
  category,
  onClick,
  showHelp = false,
}: {
  category: Category;
  onClick?: (category: Category) => void;
  showHelp?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <div className="producta-container">
      <div
        onClick={() => {
          if (onClick) {
            onClick(category);
          } else {
            navigate("categrory/" + category._id);
          }
        }}
      >
        <div className="productz-img">
          <img src={category.image} alt="" />
        </div>
        <div className="pro-info center">
          <h3>{category.name}</h3>
          {showHelp && (
            <div className="help-text">
              <p>{category.description || "Pieces that makes move"}</p>
              <p className="gradient-text">BUY NOW</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryContainer;
