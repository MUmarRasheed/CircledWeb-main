import React from "react";
import { Link } from "react-router-dom";
import HowItWorksImage from "/assets/HowItWorks.png";

function HowItWorks() {
  return (
    <div className="textpage about-page how-it-works">
      <h1 className="advent">How It Works</h1>
      <div className="contact-form">
        <div className="form-container">
          <div className="item">
            <h2>1. Create Your Profile</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <Link to="/register">Sign Up</Link>
          </div>
          <div className="item">
            <h2>2. Search & Find Products</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <Link to="/">Search & Find in your city</Link>
          </div>
          <div className="item">
            <h2>3. Order your dream item</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className="item">
            <h2>4. Arrange handover</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p>
          </div>
          <div className="item">
            <h2>5. Shine!</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <strong>PS: Feel free to tag us on Instagram@1234#5678</strong>
          </div>
          <div className="item">
            <h2>6. Return your item</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Adipisci, distinctio!
            </p>
            <Link to="/register">Get started</Link>
          </div>
        </div>
        <div className="map-image-wrapper">
          <img src={HowItWorksImage} alt="" />
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
