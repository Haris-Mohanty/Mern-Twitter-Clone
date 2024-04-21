import { createSlice } from "@reduxjs/toolkit";

export const tweetSlice = createSlice({
  name: "tweets",
  initialState: {
    tweets: null,
    refresh: false,
    isActive: true,
  },
  reducers: {
    setAllTweets: (state, action) => {
      state.tweets = action.payload;
    },
    setRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const { setAllTweets, setRefresh, setIsActive } = tweetSlice.actions;
