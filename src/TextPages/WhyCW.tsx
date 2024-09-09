import React from "react";
import AboutImage from "/assets/about-us.png";
import StripeImage from "/assets/stripes.png";
import "./WhyCW.scss";
import LImage from "/assets/L.png";
import NewsImage from "/assets/news1.png";
import PlayImage from "/assets/icons/play.svg";

function WhyCW() {
  return (
    <div className="textpage  why-page">
      <div className="contact-form">
        <div className="form-container">
          <h1 className="advent">About Us</h1>
          <small>
            Lorem Ipsum is simply dummy text of the <br /> printing and
            typesetting industry.
          </small>
          <div className="g-wrap">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
            <div className="g-container"></div>
          </div>
        </div>
        <div className="image-wrapper">
          <img src={StripeImage} id="stripe-image" alt="" />
          <img src={AboutImage} id="about-image" alt="" />
        </div>
      </div>
      <div className="about-why">
        <h1 className="advent center title">About Us or Why CW?</h1>
        <div className="news-split flex">
          <div className="main-news">
            <div className="hero-news">
              <img src={NewsImage} alt="" id="news-image" />
              <img src={PlayImage} alt="" id="play-icon" />
            </div>
            <div className="news-desc flex">
              <img src={LImage} alt="" />
              <div className="news-text">
                <h3>About Us or Why CW? | US | December 2022 </h3>
                <p className="max-500">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </p>
              </div>
            </div>
          </div>
          <div className="other-news">
            <h3>Latest</h3>
            <div className="sub-news wrap">
              <div className="news-container">
                <img src={NewsImage} alt="" />
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting
                </p>
              </div>
              <div className="news-container">
                <img src={NewsImage} alt="" />
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting
                </p>
              </div>
              <div className="news-container">
                <img src={NewsImage} alt="" />
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-500">
        <h1 className="title center advent">Our Mission</h1>
        <p className="center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro minima,
          error provident aut impedit tempora possimus vitae accusamus facere,
          temporibus aperiam animi consequatur. Odit repellendus, dignissimos
          rem, sint consequuntur consequatur sit eveniet consectetur eaque saepe
          id voluptatem vel amet, quisquam iure vitae. Aliquid, molestiae est!
          Labore illo hic id sint praesentium dicta ex modi dolorum vitae
          reiciendis iusto, voluptates error sed beatae magni sapiente earum
          numquam! Earum, nobis repellendus voluptatum atque est ipsam natus
          ducimus?
        </p>
      </div>
    </div>
  );
}

export default WhyCW;
