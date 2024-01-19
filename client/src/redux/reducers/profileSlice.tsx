import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  imgstate: boolean;
};
const initialState: InitialState = {
  imgstate: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    open2: (state) => {
      state.imgstate = true;
    },
    close2: (state) => {
      state.imgstate = false;
    },
  },
});

export default profileSlice.reducer;
export const { open2, close2 } = profileSlice.actions;
