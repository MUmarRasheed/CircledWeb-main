import "./News.scss";
import NewsImage from "/assets/news.png";
import StarIcon from "/assets/icons/goldstar.svg";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";

function News({ n }: { n: number }) {
  return (
    <div id="news-page">
      <h1 className="advent title center">OUR LATEST NEWS</h1>
      <p className="center max-500 light t1">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </p>
      <div className="category-container flex">
        {[...Array(n)].map((_, i) => (
          <div className="news-container" key={"alber-einstein-" + i}>
            <img src={NewsImage} alt="" className="newsimage" />
            <div className="text center">
              <div className="stars flex">
                {[...Array(5)].map((_, i2) => {
                  return (
                    <img
                      src={StarIcon}
                      key={"image-master-" + i + "--" + i2}
                      alt=""
                    />
                  );
                })}
              </div>
              <div className="center-text">
                <h3 className="advent bold">The Fashion Guitar</h3>
                <p className="light">
                  “I was very impressed with the quality, from the overall
                  construction to the personalization aspect; highly recommend!”
                </p>
              </div>
              <p className="bold-500 author">Nora Hillyer</p>
              <p className="light date">Feb 23,2020</p>
            </div>
          </div>
        ))}
      </div>
      <Link to="/news">
        <Button className="bold-500">VIEW MORE</Button>
      </Link>
    </div>
  );
}

export default News;
