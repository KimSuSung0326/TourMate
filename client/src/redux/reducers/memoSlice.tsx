import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  memostate: boolean;
};
const initialState: InitialState = {
  memostate: false,
};

const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    open5: (state) => {
      state.memostate = true;
    },
    close5: (state) => {
      state.memostate = false;
    },
  },
});

export default memoSlice.reducer;
export const { open5, close5 } = memoSlice.actions;
