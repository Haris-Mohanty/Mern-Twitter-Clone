import { createSlice } from "@reduxjs/toolkit";

export const tweetSlice = createSlice({
  name: "tweets",
  initialState: {
    tweets: null,
    refresh: false,
  },
  reducers: {
    setAllTweets: (state, action) => {
      state.tweets = action.payload;
    },
    setRefresh: (state) => {
      state.refresh = true;
    },
  },
});

export const { setAllTweets, setRefresh } = tweetSlice.actions;
