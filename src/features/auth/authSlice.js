import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, accessToken: null },
  reducers: {
    // I added this
    // reset: state => {
    //   state.user = null;
    //   state.token = null;
    // },
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    logout: state => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { reset, setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = state => state.auth.user;
// export const selectCurrentToken = (state) => state.auth.token
