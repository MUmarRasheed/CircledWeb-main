import "./Loading.scss";

function Loading() {
  return (
    <div className="loadera" id="loading-screen">
      <div className="loader-box">
        <div className="grounded-radiants"></div>
      </div>
      <p className="load-text center advent">Loading...</p>
    </div>
  );
}

export default Loading;
