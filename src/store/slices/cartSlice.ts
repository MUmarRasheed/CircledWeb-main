import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../services/products";

export interface CartItem {
  product: Product;
  // type: "buy" | "rent";
  color: string;
  size: string;
  _id: string;
}

export interface CartSlice {
  data: CartItem[];
  loading: boolean;
}

const initialState: CartSlice = {
  data: [],
  loading: true,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.data = action.payload;
      state.loading = false;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.data = [action.payload, ...state.data];
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item._id !== action.payload);
    },
    emptyCart: (state) => {
      state.data = [];
    },
  },
});

export const { setCartItems, addToCart, removeFromCart, emptyCart } =
  cartSlice.actions;
export default cartSlice.reducer;
