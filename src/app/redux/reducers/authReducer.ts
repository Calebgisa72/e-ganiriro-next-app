import { sessionPros } from '@/src/auth';
import { createSlice } from '@reduxjs/toolkit';

export interface sessionInfo {
  currentUser: sessionPros | null;
}

const initialState: sessionInfo = {
  currentUser: null
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    setSession: (state, action) => {
      state.currentUser = action.payload;
    }
  }
});

export const { setSession } = sessionSlice.actions;
export default sessionSlice.reducer;
