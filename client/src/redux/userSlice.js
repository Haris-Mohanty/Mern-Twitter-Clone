import { createSlice } from "@reduxjs/toolkit";

//Create Slice
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    otherUsers: null,
    profile: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    followingUpdate: (state, action) => {
      if (state.user.following.includes(action.payload)) {
        //Unfollow
        state.user.following = state.user.following.filter((itemId) => {
          return itemId !== action.payload;
        });
      } else {
        //Follow
        state.user.following.push(action.payload);
      }
    },
  },
});

export const { setUser, setOtherUsers, setProfile, followingUpdate } =
  userSlice.actions;
