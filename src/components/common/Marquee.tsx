import "./Marquee.scss";

function Marquee({ children }: any) {
  return (
    <p className="marquee">
      <span>{...children}</span>
    </p>
  );
}

export default Marquee;
