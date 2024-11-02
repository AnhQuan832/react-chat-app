import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/utils/slices/userSlice";
import messageSlice from "@/utils/slices/messageSlice";
import { enableMapSet } from "immer";

enableMapSet();
const rootReducer = {
  user: userReducer,
  contact: messageSlice,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immer: true,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
