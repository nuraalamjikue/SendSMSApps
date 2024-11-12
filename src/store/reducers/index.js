// reducers/index.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import userInfoSlice from './userInfoSlice';

const persistConfig = {
  key: 'persist-store',
  storage: AsyncStorage,
  version: 1,
  debug: false,
};

const reducer = combineReducers({
  userInfo: userInfoSlice,
});

const rootReducer = persistReducer(persistConfig, reducer);

export default rootReducer;
