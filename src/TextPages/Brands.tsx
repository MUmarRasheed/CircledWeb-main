import React from "react";
import Brand1 from "/assets/a1 (1).png";
import Brand2 from "/assets/a1 (2).png";
import Brand3 from "/assets/a1 (3).png";
import Brand4 from "/assets/a1 (4).png";
import Brand5 from "/assets/a1 (5).png";

function Brands() {
  return (
    <div id="news-page" className="brands">
      <h1 className="advent center title">ALL BRANDS</h1>
      <div className="flex category-container">
        <img src={Brand1} alt="" />
        <img src={Brand2} alt="" />
        <img src={Brand3} alt="" />
        <img src={Brand4} alt="" />
        <img src={Brand5} alt="" />
      </div>
    </div>
  );
}

export default Brands;
