import "./DropDownMenu.scss";

function DropDownMenu({
  open,
  close,
  children,
}: {
  open: boolean;
  close: () => void;
  children: any;
}) {
  return (
    <div className="dropdowner" style={{ display: open ? "block" : "none" }}>
      {open && (
        <div>
          <div className="popup-overlay" onClick={close}></div>
          <div className="options-container">{children}</div>
        </div>
      )}
    </div>
  );
}

export default DropDownMenu;
