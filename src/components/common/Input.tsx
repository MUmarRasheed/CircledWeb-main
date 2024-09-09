import "./Input.scss";

function Input({ label, ...rest }: any) {
  return (
    <div className="input-container">
      <label>{label}</label>
      <input {...rest} />
    </div>
  );
}

export default Input;
