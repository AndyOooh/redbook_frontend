import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, accessToken: null },
  reducers: {
    // I added this
    reset: state => {
      state.user = null;
      state.accessToken = null;
    },
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    updateUser: (state, action) => {
      // Can only update one property at a time!!
      const [key] = Object.keys(action.payload);
      const [value] = Object.values(action.payload);
      state.user[key] = value;
    },
  },
});

export const { reset, setCredentials, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = state => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token
