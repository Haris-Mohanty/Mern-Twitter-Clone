import { createSlice } from "@reduxjs/toolkit";

export const tweetSlice = createSlice({
  name: "tweets",
  initialState: {
    tweets: null,
  },
  reducers: {
    setAllTweets: (state, action) => {
      state.tweets = action.payload;
    },
  },
});

export const { setAllTweets } = tweetSlice.actions;
