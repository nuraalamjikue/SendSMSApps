// reducers/counterSlice.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  getToken: '',
  getEmployeeCode: '',
  getPassword: '',
  getCompanyID: 0,
  getUrl: 0,
  getRoleID: '',
  CreateByID: 0,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.getToken = action.payload;
      // console.log('action.payload' + action.payload);
    },

    setEmployeeCodetoolkit: (state, action) => {
      state.getEmployeeCode = action.payload;
      // console.log('action.payload' + action.payload);
    },
    setCurrentPassword: (state, action) => {
      state.getPassword = action.payload;
      // console.log('action.payload' + action.payload);
    },
    setgetCompanyID: (state, action) => {
      state.getCompanyID = action.payload;
    },
    setgetUrl: (state, action) => {
      state.getUrl = action.payload;
    },
    setRoleID: (state, action) => {
      state.getRoleID = action.payload;
    },
    setCreateByID: (state, action) => {
      state.CreateByID = action.payload;
    },
  },
});

export const {
  setEmployeeCodetoolkit,
  setCurrentPassword,
  setgetCompanyID,
  setCreateByID,
  setgetUrl,
  setRoleID,
  setToken,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
