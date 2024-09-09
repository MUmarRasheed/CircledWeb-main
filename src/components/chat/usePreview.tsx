import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  getOneChatMessage,
  Message,
  UserProfile,
  userProfileCollection,
} from "./services";

function usePreview(
  thisUser: string,
  otherUser: string
): [
  Message | null,
  boolean,
  {
    chat: string;
    user: string;
  },
  UserProfile | null
] {
  const [loading, setLoading] = useState(true);
  const [user2Load, setUser2Load] = useState(true);
  const [error, setError] = useState({
    chat: "",
    user: "",
  });
  const [messages, setMessages] = useState<Message>();
  const [userData, setUserData] = useState<UserProfile>();

  useEffect(() => {
    if (!thisUser || !otherUser) return;

    setError({
      chat: "",
      user: "",
    });

    setLoading(true);
    setUser2Load(true);

    function processSnap(snap: any) {
      const messages: Message[] = [];
      snap.forEach((doc: any) => {
        messages.push({ ...doc.data(), id: doc.id } as any);
      });

      setMessages(messages[0]);
      setLoading(false);
    }

    async function loadMessages() {
      const res = await getOneChatMessage(thisUser, otherUser, processSnap);

      if (res.error) {
        setError(res.message);
        setLoading(false);
        return;
      }

      // setUnsubscribe(res.unsubscribe);
    }

    async function loadUserProfile(
      id: string,
      setLoading: (val: boolean) => void
    ) {
      try {
        onSnapshot(doc(db, userProfileCollection, id), (snap: any) => {
          if (snap.exists()) {
            setUserData(snap.data());
          }
          setLoading(false);
        });
      } catch (e: any) {
        console.log(e);
        setError({
          ...error,
          user: e.message || "User fetch failed",
        });
      }
    }

    loadMessages();
    loadUserProfile(otherUser, setUser2Load);

    // return () => unsubscribe;
  }, [thisUser, otherUser]);

  return [
    messages || null,
    error.chat || error.user ? false : loading || user2Load,
    error,
    userData || null,
  ];
}

export default usePreview;
