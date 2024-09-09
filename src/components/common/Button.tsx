import "./Button.scss";
import Loader from "/assets/icons/spinner.svg";

function Button({
  children,
  loading = false,
  disabled,
  className,
  ...rest
}: any) {
  return (
    <div className={"btn-container " + (loading ? "loading" : "")}>
      <button
        className={"btn-primary flex " + className}
        {...rest}
        disabled={loading || disabled}
      >
        {loading && <img src={Loader} alt="" className="loader" />}
        {!loading && children}
      </button>
    </div>
  );
}

export default Button;
