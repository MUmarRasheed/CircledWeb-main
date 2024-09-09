import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import usePreview from "./usePreview";
import AvatarIcon from "/assets/avtar.png";

function ChatPreview({ from, to }: { from: string; to: string }) {
  const [message, loading, error, userData] = usePreview(from, to);

  const { id } = useParams();
  //   useEffect(() => {
  //     console.log(from, to, error, message, userData);
  //   }, [message]);

  // if (!userData) return <></>;

  return (
    <Link to={"/chat/user/" + to}>
      <div className={"user-preview " + (id === to ? "current-user" : "")}>
        <div className="img-c">
          <img
            src={userData?.image || AvatarIcon}
            alt=""
            className="round-image"
          />
        </div>
        <div className="content">
          <h3>{userData?.name}</h3>
          {message ? (
            <p>
              {message.from === from && "You : "}
              {message.content}
            </p>
          ) : (
            <p>No messages yet.</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ChatPreview;
