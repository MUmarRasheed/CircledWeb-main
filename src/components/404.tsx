import React from "react";
import "./ErrorPages.scss";

function _404() {
  return (
    <div className="error-page center">
      <h1 className="advent title1">404</h1>
      <h2 className="subtitle">Page not found</h2>
      <p className="description">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}

export default _404;
