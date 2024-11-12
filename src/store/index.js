// store.js
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import rootReducer from './reducers';
import { persistStore } from 'redux-persist';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

export default store;

export const persistor = persistStore(store);
