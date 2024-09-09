import React from "react";
import Button from "../components/common/Button";

function Insurance() {
  return (
    <div id="insurance">
      <h1 className="title advent">Insurance</h1>
      <div className="insurance-wrapper">
        <div className="insurance-container flex wrap">
          <div className="flex wrap">
            <div className="image-box"></div>
            <div className="text">
              <h3>Premium Plus</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse,
                accusamus.
              </p>
            </div>
          </div>
          <p>$100</p>
        </div>
      </div>
      <Button>Buy Insurance</Button>
    </div>
  );
}

export default Insurance;
