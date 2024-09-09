import CloseIcon from "/assets/icons/close.svg";
import "./MultiSelect.scss";

function RemovableImage({
  onDelete,
  value,
}: {
  onDelete: () => void;
  value: string;
}) {
  return (
    <div className="removable-image flex">
      <img src={value} alt="" className="data-image" />
      <img
        src={CloseIcon}
        alt=""
        onClick={onDelete}
        className="remove-icon img-remove-icon"
      />
    </div>
  );
}

export default RemovableImage;
