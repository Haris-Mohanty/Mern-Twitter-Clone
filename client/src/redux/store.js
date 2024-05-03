import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { spinnerSlice } from "./spinnerSlice";
import { tweetSlice } from "./tweetSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

//Combine Reducer
const rootReducer = combineReducers({
  spinner: spinnerSlice.reducer,
  user: userSlice.reducer,
  tweets: tweetSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
