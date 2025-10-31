'use client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userslice';
import listReducer from './listslice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user', 'list'],
};

const rootReducer = combineReducers({
  user: userReducer,
  list: listReducer,
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

// create and export persistor so there's a single persistor instance used app-wide
export const persistor = persistStore(store);

export default store;
