import { createSlice } from "@reduxjs/toolkit";

//Redux para guardar nombre
export const nameSlice = createSlice({
  name: "name",
  initialState: "",
  reducers: {
    getName: (state, action) => action.payload,
  },
});

export const { getName } = nameSlice.actions;
export default nameSlice.reducer;
