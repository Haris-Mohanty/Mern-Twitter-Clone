import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { spinnerSlice } from "./spinnerSlice";
import { tweetSlice } from "./tweetSlice";

//Combine Reducer
const rootReducer = combineReducers({
  spinner: spinnerSlice.reducer,
  user: userSlice.reducer,
  tweets: tweetSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
