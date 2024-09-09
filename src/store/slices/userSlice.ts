import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  _id: string;
  name: string;
  email: string;
  image: string | null;
  gender: string | null;
  phone: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  fcmKey: string;
  address: string | null;
  description: string | null;
}

export interface UserState {
  user: User | null;
  status: "authorized" | "loading" | "unauthorized";
  token: string | null;
}

const initialState: UserState = {
  user: null,
  status: "loading",
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = "authorized";
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setUserProfile: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem(
        "user",
        JSON.stringify({ user: action.payload, token: state.token })
      );
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.status = "unauthorized";
      localStorage.removeItem("user");
    },
    setUnauthorized: (state) => {
      state.status = "unauthorized";
    },
  },
});

export const { setUser, logoutUser, setUserProfile, setUnauthorized } =
  userSlice.actions;
export default userSlice.reducer;
