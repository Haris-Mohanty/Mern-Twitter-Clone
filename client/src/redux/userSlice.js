import { createSlice } from "@reduxjs/toolkit";

//Create Slice
export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    otherUsers: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
  },
});

export const { setUser, setOtherUsers } = userSlice.actions;
