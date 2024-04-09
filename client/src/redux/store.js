import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";

const store = configureStore({
  reducer: {
    //Actions
    user: userSlice,
  },
});

export default store;
