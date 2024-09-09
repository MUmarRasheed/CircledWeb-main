import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Category, getDashboard } from "../services/products";
import Brands from "../TextPages/Brands";
import News from "../TextPages/News";
import Button from "./common/Button";
import CategoryContainer from "./common/CategoryContainer";
import ProductsWrapper from "./common/ProductsWrapper";
import PersonImage from "/assets/person.png";
import "./Home.scss";

function Home() {
  const [dashboardData, setDashboardData] = React.useState<any>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchDashboard() {
      const response = await getDashboard();
      setDashboardData(response?.data);
    }

    fetchDashboard();
  }, []);

  return (
    <div id="hero">
      <div id="hero-section">
        <div className="text-wrapper">
          <h1 className="advent center title">
            Join the largest shared wardrobe in the UK
          </h1>
          <p className="subtitle center">Rent, Lend, Sell Your Wardrobe.</p>
          <div className="hero-buttons flex">
            <Button
              className="advent buy-now-btn"
              onClick={() => {
                navigate("/products?type=buy");
              }}
            >
              BUY NOW
            </Button>
            <button
              className="advent outline-btn"
              onClick={() => {
                navigate("/products?type=rent");
              }}
            >
              RENT NOW
            </button>
          </div>
        </div>
      </div>
      <div id="latest-pros">
        <h1 className="advent center">See the Latest</h1>
        <ProductsWrapper
          products={dashboardData?.products.slice(0, 4) || []}
        ></ProductsWrapper>
        {/* <Link to="/products" className="center more-link">
          Browse all products
        </Link> */}
        <Button className="bold-500" onClick={() => navigate("/products")}>
          VIEW ALL
        </Button>
      </div>
      <div id="community">
        <h1 className="advent center title">Our Community</h1>
        <div className="flex category-container">
          {[...Array(6)].map((_, i) => (
            <div className="person">
              <img src={PersonImage} key={"president-" + i} />
              <p className="center bold">Mark</p>
            </div>
          ))}
        </div>
      </div>
      <div id="browse-cats">
        <h1 className="advent center">What are you looking for?</h1>
        <h3 className="advent center">BRING THE JOY</h3>
        <div className="category-container flex">
          {dashboardData?.categories
            ?.slice(0, 3)
            .map((category: Category, i: number) => (
              <CategoryContainer
                category={category}
                key={category._id}
                onClick={(category: Category) => {
                  navigate("/browse/" + category._id);
                }}
                showHelp={true}
              ></CategoryContainer>
            ))}
        </div>
        {/* <Link to="/browse" className="center more-link">
          Browse all Categories
        </Link> */}
        <Button className="bold-500" onClick={() => navigate("/browse")}>
          BROWSE ALL
        </Button>
      </div>
      <div id="latest-pros">
        <h1 className="advent center">Buy & Rent Their Wardrobes</h1>
        <ProductsWrapper
          products={dashboardData?.products.slice(0, 8) || []}
        ></ProductsWrapper>
        {/* <Link to="/products" className="center more-link">
          Browse all products
        </Link> */}
        <Button className="bold-500" onClick={() => navigate("/products")}>
          VIEW ALL
        </Button>
      </div>
      <Brands></Brands>
      <News n={3}></News>
      {/* <div id="browse-news">
      </div> */}
    </div>
  );
}

export default Home;
