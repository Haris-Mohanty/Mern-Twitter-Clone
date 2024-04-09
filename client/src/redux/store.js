import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { spinnerSlice } from "./spinnerSlice";

//Combine Reducer
const rootReducer = combineReducers({
  spinner: spinnerSlice.reducer,
  user: userSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
