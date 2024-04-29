import { configureStore } from "@reduxjs/toolkit";
import name from "./slices/name.slice";
import item from "./slices/item.slice";

export default configureStore({
  reducer: {
    name,
    item,
  },
});
