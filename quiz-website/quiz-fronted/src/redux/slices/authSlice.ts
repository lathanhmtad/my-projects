import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParticipantResponse } from '../../models/Participant';

interface AuthState {
  accessToken: string | null;
  participant: ParticipantResponse | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  participant: null,
  refreshToken: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    updateRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    updateParticipant: (state, action: PayloadAction<ParticipantResponse>) => {
      state.participant = action.payload;
    },
    resetAuthState: (state) => {
      state.accessToken = null;
      state.participant = null;
      state.refreshToken = null;
    }
  },
});

export const {
  updateAccessToken,
  updateParticipant, updateRefreshToken, resetAuthState
} = authSlice.actions;

export default authSlice.reducer;