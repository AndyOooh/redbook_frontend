import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    // reset: state => {
    //   state = [];
    // },
    addPost: (state, action) => {
      // use old state?
      state.push(action.payload);
    },
  },
});

export const { reset, addPost } = postSlice.actions;

export default postSlice.reducer;

// export const selectCurrentToken = (state) => state.auth.token
