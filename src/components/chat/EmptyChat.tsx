import React from "react";

function EmptyChat() {
  return (
    <div
      className="sm-hide"
      style={{
        display: "grid",
        placeItems: "center",
      }}
    >
      <p className="center">Click a chat to view here!</p>
    </div>
  );
}

export default EmptyChat;
