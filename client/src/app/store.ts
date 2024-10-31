import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/utils/slices/userSlice";
import messageSlice from "@/utils/slices/messageSlice";

const rootReducer = {
  user: userReducer,
  contact: messageSlice,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
