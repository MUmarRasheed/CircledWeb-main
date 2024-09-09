import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { User } from "../../store/slices/userSlice";
import { db } from "./firebase";

export interface UserProfile {
  id: string;
  name: string;
  image: string;
  chats: string[];
}

export interface Message {
  from: string;
  to: string;
  roomId: string;
  content: string;
  createdAt: Timestamp;
  id?: string;
}

export const userProfileCollection = "userProfile";
export const messageCollection = "messages";

export async function createUserProfile(user: User) {
  try {
    await setDoc(
      doc(db, userProfileCollection, user._id),
      {
        id: user._id,
        name: user.name,
        image: user.image,
        //   chats: [],
      },
      {}
    );
    return true;
  } catch (e: any) {
    console.log(e);
    return false;
  }
}

export function fetchUserProfile(id: string) {
  return getDoc(doc(db, userProfileCollection, id));
}

async function checkUserProfileExists(id: string) {
  return (await fetchUserProfile(id)).exists();
}

async function startChatForUser(user: User, user2Id: string) {
  if (!(await checkUserProfileExists(user._id))) {
    await createUserProfile(user);
  }
  // console.log(user2Id);
  await updateDoc(doc(db, userProfileCollection, user._id), {
    chats: arrayUnion(user2Id),
  });
}

export async function startChat(user1: User, user2: User) {
  try {
    await startChatForUser(user1, user2._id);
    await startChatForUser(user2, user1._id);
    return { error: "" };
  } catch (e) {
    console.log(e);
    return { error: e };
  }
}

function getChatRoomId(a: string, b: string) {
  return [a, b].sort().join("-");
}

export async function getChatMessages(
  user1: string,
  user2: string,
  callback: (snap: any) => void
) {
  const roomId = getChatRoomId(user1, user2);

  try {
    const q = query(
      collection(db, messageCollection),
      where("roomId", "==", roomId),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      // console.log(snap);
      callback(snap);
    });

    return { error: false, unsubscribe };
  } catch (e: any) {
    console.log(e);
    return { error: true, message: e.message || "Chat Fetch failed" };
  }
}
export async function getOneChatMessage(
  user1: string,
  user2: string,
  callback: (snap: any) => void
) {
  const roomId = getChatRoomId(user1, user2);

  try {
    const q = query(
      collection(db, messageCollection),
      where("roomId", "==", roomId),
      orderBy("createdAt", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      // console.log(snap);
      callback(snap);
    });

    return { error: false, unsubscribe };
  } catch (e: any) {
    console.log(e);
    return { error: true, message: e.message || "Chat Fetch failed" };
  }
}

export function saveMessage(data: {
  content: string;
  from: string;
  to: string;
}) {
  const message = {
    ...data,
    roomId: getChatRoomId(data.from, data.to),
    createdAt: serverTimestamp(),
  };

  return addDoc(collection(db, messageCollection), message);
}
