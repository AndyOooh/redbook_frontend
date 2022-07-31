import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, accessToken: null },
  reducers: {
    // I added this
    reset: state => {
      state.user = null;
      state.tokenaccessToken = null;
    },
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
  },
});

export const { reset, setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = state => state.auth.user;
// export const selectCurrentToken = (state) => state.auth.token
