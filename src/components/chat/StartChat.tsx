import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPublicProfile, getUserProfile } from "../../services/auth";
import { useAppSelector } from "../../store/hooks";
import Loading from "../common/Loading";
import { startChat } from "./services";

function StartChat() {
  const { id } = useParams();
  const [error, setError] = useState("");
  const thisUser = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (thisUser.status === "loading") return;
    async function startChatUser() {
      // console.log(id, thisUser);

      if (!id || !thisUser.user) {
        setError("User Id is required");
        return;
      }

      try {
        const user = await getUserProfile(id);
        // console.log(user.data.data, thisUser.user);

        const res: any = await startChat(thisUser.user, user.data.data);

        if (res.error) throw new Error(res.error);
        navigate("/chat/user/" + user.data.data._id);
      } catch (e: any) {
        setError(
          e.response?.data?.message ||
            e.message ||
            "Somethig went wrong with starting the chat."
        );
        return;
      }
    }

    startChatUser();
  }, [thisUser]);

  return (
    <div>
      {error && <p className="error-msg center">{error}</p>}
      {!error && <Loading />}
    </div>
  );
}

export default StartChat;
