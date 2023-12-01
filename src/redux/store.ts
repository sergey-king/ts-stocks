import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import { albertApi } from "./api";
import { appSettingsSlice } from "./slices/device";
import { stockTickersWatchlistSlice } from "./slices/stockTickersWatchlist";

// Combine all reducers into one
const combinedReducer = combineReducers({
    appSettings: appSettingsSlice.reducer,
    stockTickersWatchlist: stockTickersWatchlistSlice.reducer,
    [albertApi.reducerPath]: albertApi.reducer,
});

// Persisted reducer
const persistedReducer = persistReducer({ key: "root", storage: AsyncStorage }, combinedReducer);

// Main redux store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        // serializableCheck: false, immutableCheck: false - are only enalbed in development mode
        getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(albertApi.middleware),
});

// Main redux store persistor
export const persistor = persistStore(store);

setupListeners(store.dispatch);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
