import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Address {
  _id?: string;
  street: string;
  phone: string;
  city: string;
  pinCode: string;
}

export interface AddressSlice {
  data: Address[];
}

const initialState: AddressSlice = {
  data: [],
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<{ address: Address[] }>) => {
      state.data = action.payload.address;
      // console.log(action.payload);
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.data = [action.payload, ...state.data];
    },
    removeAddress(state, action: PayloadAction<{ index: number }>) {
      state.data = [
        ...state.data.slice(0, action.payload.index),
        ...state.data.slice(action.payload.index + 1),
      ];
    },
  },
});

export const { setAddress, addAddress, removeAddress } = addressSlice.actions;
export default addressSlice.reducer;
