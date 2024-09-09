import React, { useEffect, useState } from "react";
import {
  fetchUserProfile,
  getChatMessages,
  Message,
  UserProfile,
} from "./services";

function useChat(
  thisUser: string,
  otherUser: string
): [
  Message[],
  boolean,
  {
    chat: string;
    user: string;
  },
  { [key: string]: UserProfile | null }
] {
  const [loading, setLoading] = useState(true);
  const [user1Load, setUser1Load] = useState(true);
  const [user2Load, setUser2Load] = useState(true);
  const [error, setError] = useState({
    chat: "",
    user: "",
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [unsubscribe, setUnsubscribe] = useState<() => void>();
  const [userData, setUserData] = useState<{
    [key: string]: UserProfile | null;
  }>({});

  useEffect(() => {
    if (!thisUser || !otherUser) return;

    setError({
      chat: "",
      user: "",
    });

    setLoading(true);
    setUser1Load(true);
    setUser2Load(true);

    function processSnap(snap: any) {
      const messages: Message[] = [];
      snap.forEach((doc: any) => {
        messages.push({ ...doc.data(), id: doc.id } as any);
      });

      setMessages(messages);
      setLoading(false);
    }

    async function loadMessages() {
      const res = await getChatMessages(thisUser, otherUser, processSnap);

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
        const res = await fetchUserProfile(id);
        setLoading(false);

        if (res.exists()) {
          return res.data() as any;
        } else {
          return null;
        }
      } catch (e: any) {
        console.log(e);
        setError({
          ...error,
          user: e.message || "User fetch failed",
        });
      }
    }

    async function loadProfiles() {
      const user1 = await loadUserProfile(thisUser, setUser1Load);
      const user2 = await loadUserProfile(otherUser, setUser2Load);

      const newData: any = {};
      newData[thisUser] = user1;
      newData[otherUser] = user2;
      setUserData(newData);
    }

    loadMessages();
    loadProfiles();

    // return () => unsubscribe;
  }, [thisUser, otherUser]);

  return [
    messages,
    error.chat || error.user ? false : loading || user1Load || user2Load,
    error,
    userData,
  ];
}

export default useChat;
