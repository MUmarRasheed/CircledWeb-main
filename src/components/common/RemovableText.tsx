import React from "react";
import CloseIcon from "/assets/icons/close.svg";

function RemovableText({
  onDelete,
  value,
}: {
  onDelete: () => void;
  value: string;
}) {
  return (
    <div className="removable removable-text flex">
      <strong>{value}</strong>
      <img src={CloseIcon} alt="" className="remove-icon" onClick={onDelete} />
    </div>
  );
}

export default RemovableText;
