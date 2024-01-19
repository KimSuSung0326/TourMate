import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  isOpen: boolean;
};
const initialState: InitialState = {
  isOpen: true,
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    open1: (state) => {
      state.isOpen = true;
    },
    close1: (state) => {
      state.isOpen = false;
    },
  },
});

export default logoutSlice.reducer;
export const { open1, close1 } = logoutSlice.actions;
