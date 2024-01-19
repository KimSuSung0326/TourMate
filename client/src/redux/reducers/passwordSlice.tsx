import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  passwordstate: boolean;
};
const initialState: InitialState = {
  passwordstate: false,
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    open4: (state) => {
      state.passwordstate = true;
    },
    close4: (state) => {
      state.passwordstate = false;
    },
  },
});

export default passwordSlice.reducer;
export const { open4, close4 } = passwordSlice.actions;
