import { useState } from "react";
import arrowIcon from "/assets/icons/arrow.svg";
import "./ExpandableText.scss";

function ExpandableText({
  title,
  content = "",
}: {
  title: string;
  content?: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <div className={"expand-container " + (active ? "active" : "")}>
      <div className="expand-title flex" onClick={() => setActive(!active)}>
        <h3>{title}</h3>
        <img src={arrowIcon} alt="" className="arrow" />
      </div>
      <div className="expand-content">{content}</div>
    </div>
  );
}

export default ExpandableText;
