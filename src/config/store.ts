import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import globalReducer from "./globalStore"
import loginReducer from "../pages/login/loginStore"

const persistConfig = {
  key: "global",
  storage,
  whitelist: ["token", "permissions", "loading", "toasts"],
  serialize: true,
}

const persistedGlobalReducer = persistReducer(persistConfig, globalReducer)

export const store = configureStore({
  reducer: {
    global: persistedGlobalReducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: [
          "global.token",
          "global.permissions",
          "global.loading",
          "global.toasts",
        ],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
