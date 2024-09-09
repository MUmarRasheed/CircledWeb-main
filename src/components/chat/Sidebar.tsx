import "./Sidebar.scss";
import { doc } from "firebase/firestore";

import { useDocument } from "react-firebase-hooks/firestore";
import { useAppSelector } from "../../store/hooks";
import { db } from "./firebase";
import { UserProfile, userProfileCollection } from "./services";
import { useEffect } from "react";
import ChatPreview from "./ChatPreview";
import { useLocation } from "react-router-dom";

function Sidebar() {
  const user = useAppSelector((state) => state.user.user);
  const [chatProfile, loading, error] = useDocument<any>(
    user?._id ? doc(db, userProfileCollection, user?._id) : null
  );

  const { pathname } = useLocation();

  // useEffect(() => {
  //   console.log(chatProfile?.data());
  // }, [chatProfile]);

  return (
    <div id="sidebar" className={"" + (pathname === "/chat" ? "" : "sm-hide")}>
      <h3>My Chats</h3>
      {chatProfile?.data()?.chats?.map((id: string) => (
        <>
          <ChatPreview
            key={"michaeljackson-" + id}
            from={chatProfile?.data().id}
            to={id}
          />
        </>
      ))}
    </div>
  );
}

export default Sidebar;
