import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import Button from "../common/Button";
import Loading from "../common/Loading";
import { saveMessage } from "./services";
import useChat from "./useChat";
import AvatarIcon from "/assets/avtar.png";
import "./Messaging.scss";
import ArrowIcon from "/assets/icons/arrow2.svg";
import { Link } from "react-router-dom";

const scrollTo = (ref: any) => {
  setTimeout(
    () =>
      ref.current.scrollIntoView({
        inline: "center",
        behavior: "smooth",
        block: "nearest",
      }),
    777
  );
};

function Messaging() {
  const { id } = useParams();
  const user = useAppSelector((state) => state.user.user);
  const [messages, loading, loadError, userData] = useChat(
    user?._id || "",
    id || ""
  );
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const [sendLoading, setSendLoading] = useState(false);
  const ref = useRef<any>();
  const ref2 = useRef<any>();

  useEffect(() => {
    setError("");
  }, [id, user]);

  useEffect(() => {
    scrollTo(ref);
    // scrollTo(ref2);
    // console.log("scrolling");
  }, [ref.current, messages]);

  async function sendMessage(e: any) {
    e.preventDefault();
    if (!newMessage) return;

    try {
      setSendLoading(true);
      const res = await saveMessage({
        from: user?._id || "",
        to: id || "",
        content: newMessage,
      });

      setSendLoading(false);
      setNewMessage("");
    } catch (e: any) {
      setError(e.message || "Couldn't send message");
      setSendLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <div id="messenger">
      <div className="header">
        <Link to={"/users/" + user?._id} className="head-wrap">
          <img
            className="round-image big-image"
            src={userData[id || ""]?.image || AvatarIcon}
            alt=""
          />
          <h3>{userData[id || ""]?.name}</h3>
        </Link>
        <Link to="/chat" id="back-icon" className="hide">
          <img src={ArrowIcon} alt="" />
        </Link>
      </div>
      <div className="error-container">
        {loadError.chat && <p className="error-msg">{loadError.chat}</p>}
        {loadError.user && <p className="error-msg">{loadError.user}</p>}
        {error && <p className="error-msg">{error}</p>}
      </div>
      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message) => {
            return (
              <div
                className={
                  "message-wrap " +
                  (message.from === user?._id ? "my-message" : "")
                }
                key={message.id || "hel"}
              >
                <div className="message-content">
                  <img
                    src={userData[message.from]?.image || AvatarIcon}
                    alt=""
                    className={
                      "round-image message-avatar " +
                      (message.from === user?._id ? "small-image" : "")
                    }
                  />
                  <p className="text">{message.content}</p>
                </div>
                <small className="message-info">
                  {message?.createdAt?.toDate().toLocaleString()}
                </small>
              </div>
            );
          })}
          <span ref={ref}></span>
        </div>
        <div className="texter">
          <form onSubmit={(e) => sendMessage(e)}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => {
                setError("");
                !sendLoading && setNewMessage(e.target.value);
              }}
              ref={ref2}
              placeholder="Type your message..."
            />
            <div className="btn-wrapper">
              <Button type="submit" loading={sendLoading}>
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Messaging;
