import { sessionPros } from '@/src/auth';
import { createSlice } from '@reduxjs/toolkit';

export interface sessionInfo {
  session: sessionPros | null;
}

const initialState: sessionInfo = {
  session: null
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
    }
  }
});

export const { setSession } = sessionSlice.actions;
export default sessionSlice.reducer;
