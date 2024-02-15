import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  titlestate: boolean;
};
const initialState: InitialState = {
  titlestate: false,
};

const titleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    open7: (state) => {
      state.titlestate = true;
    },
    close8: (state) => {
      state.titlestate = false;
    },
  },
});

export default titleSlice.reducer;
export const { open7, close8 } = titleSlice.actions;
