import { createSlice } from "@reduxjs/toolkit";

//Numero de cards por pantalla
export const itemSlice = createSlice({
  name: "item",
  initialState: 8,
  reducers: {
    getItem: (state, action) => action.payload,
  },
});

export const { getItem } = itemSlice.actions;
export default itemSlice.reducer;
