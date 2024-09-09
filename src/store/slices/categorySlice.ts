import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../services/products";

export interface CategoryState {
  data: Category[];
}

const initialState: CategoryState = {
  data: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<{ category: Category[] }>) => {
      state.data = action.payload.category;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
