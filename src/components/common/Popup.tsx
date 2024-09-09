import React, { useEffect } from "react";
import closeIcon from "/assets/icons/close.svg";
import "./Popup.scss";

function Popup({
  close,
  open,
  children,
  ...rest
}: {
  close: () => void;
  open: boolean;
  children: React.ReactNode;
}) {
  function restore() {
    document.body.style.overflow = "unset";
    document.body.style.paddingRight = "0px";
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else restore();

    return restore;
  }, [open]);

  return (
    <div
      style={{
        display: open ? "flex" : "none",
      }}
    >
      <div className="popup-overlay" onClick={close}></div>
      <div className="popup-container" {...rest}>
        <div className="popup-header">
          <button onClick={close} className="close-btn">
            <img src={closeIcon} alt="" />
          </button>
        </div>
        <div className="popup-content">{children}</div>
      </div>
    </div>
  );
}

export default Popup;
