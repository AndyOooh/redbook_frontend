import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

console.log('in userSlice.js initialState', initialState);

// register ---------------------------------------------------------------
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userInputs, { rejectWithValue }) => {
    try {
      return await authService.register(userInputs);
    } catch (error) {
      const message = authService.errorHandler(error);
      return rejectWithValue(message);
    }
  }
);

// login ---------------------------------------------------------------
export const loginUser = createAsyncThunk('auth/login', async (userInputs, { rejectWithValue }) => {
  try {
    return await authService.login(userInputs);
  } catch (error) {
    console.log('error in loginUser catch block', error);
    const message = authService.errorHandler(error);
    return rejectWithValue(message);
  }
});

// activate ---------------------------------------------------------------
export const activateAccount = createAsyncThunk(
  'users/activateAccount',
  async (activationToken, thunkAPI) => {
    const userToken = thunkAPI.getState().auth.user.token;
    try {
      return await authService.activate(activationToken, userToken);
    } catch (error) {
      console.log('error in activateAccount catch block', error);
      const message = authService.errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//  Slice ---------------------------------------------------------------
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  // Extra Reducers ---------------------------------------------------------------
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Registration successfull. Please check your email to verify your account.';
        state.user = action.payload;
      })
      // Login ------------------------------------------------------------------------
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Login successfull.';
        state.user = action.payload;
      })
      // Activate ------------------------------------------------------------------------
      .addCase(activateAccount.pending, state => {
        state.isLoading = true;
      })
      .addCase(activateAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(activateAccount.fulfilled, (state, action) => {
        state.message = 'Activation successfull.';
        state.user = { ...state.user, verified: true };
      });
      
    // Logout ------------------------------------------------------------------------
    // .addCase(logout.fulfilled, state => {
    //   state.user = null;
    // });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
