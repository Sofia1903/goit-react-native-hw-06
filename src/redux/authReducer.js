import { createSlice } from '@reduxjs/toolkit';
import { signUpWithEmail, signInwithEmail, logOut, authStateChanged } from './operations';

const initialState = {
  user: { email: null, login: null, uid: null },
  userId: null,
  error: null,
  status: 'idle',
  stateChange: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUpWithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userId = action.payload.uid;
        state.error = null;
        state.status = 'isRegistred';
      })
      .addCase(signUpWithEmail.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(signUpWithEmail.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(signInwithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userId = action.payload.userId;
        state.error = null;
        state.status = 'isLoggedIn';
      })
      .addCase(signInwithEmail.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(signInwithEmail.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.userId = null;
        state.error = null;
        state.status = 'logOuted';
      })
      .addCase(logOut.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(logOut.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(authStateChanged.fulfilled, (state, action) => {
        state.stateChange = action.payload.stateChange;
      })
      .addCase(authStateChanged.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(authStateChanged.pending, (state) => {
        state.status = 'pending';
      });
  },
});

// authStateChange: (state, { payload }) => ({
//   ...state,
//   stateChange: payload.stateChange,
// }),

export const authReducer = authSlice.reducer;
