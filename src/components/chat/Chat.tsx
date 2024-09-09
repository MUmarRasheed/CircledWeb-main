import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Chat.scss";

function Chat() {
  return (
    <div id="chat-split">
      <Sidebar></Sidebar>
      <Outlet></Outlet>
    </div>
  );
}

export default Chat;
