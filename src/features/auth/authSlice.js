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
      console.log('in registerUser, error:', error);
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

// verify ---------------------------------------------------------------
export const verifyAccount = createAsyncThunk(
  'users/verifyAccount',
  async (verificationToken, thunkAPI) => {
    const userToken = thunkAPI.getState().auth.user.token;
    try {
      return await authService.verify(verificationToken, userToken);
    } catch (error) {
      console.log('error in verifyAccount catch block: ', error);
      const message = authService.errorHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// resend verification email ---------------------------------------------------------------
export const resendVerificationEmail = createAsyncThunk(
  'users/resendVerify',
  async (undefined, thunkAPI) => {
    console.log('in resendVerificationEmail thunk');
    const userToken = thunkAPI.getState().auth.user.token;
    try {
      return await authService.resendVerify(userToken);
      // console.log('data in resendVerificationEmail thunk', data);
      // return data;
    } catch (error) {
      console.log('error in resendVerificationEmail catch block: ', error);
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
    logout: state => {
      localStorage.removeItem('user');
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.user = null;
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
      // Verify ------------------------------------------------------------------------
      .addCase(verifyAccount.pending, state => {
        state.isLoading = true;
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Verification successfull.';
        state.user = { ...state.user, verified: true };
      })
      // Resend Verification email ------------------------------------------------------------------------
      .addCase(resendVerificationEmail.pending, state => {
        state.isLoading = true;
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(resendVerificationEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'A verification link has been sent to your email.';
      });

    // Logout ------------------------------------------------------------------------
    // .addCase(logout.fulfilled, state => {
    //   state.user = null;
    // });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
