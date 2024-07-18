import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AuthReducer } from "../slices/AuthenticationSlices";
import { AccountReducer } from "../slices/AccountSlices";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { GeneralReducer } from "../slices/GeneralSlices";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Persist only the 'auth' reducer
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  accountDetails: AccountReducer,
  general : GeneralReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;