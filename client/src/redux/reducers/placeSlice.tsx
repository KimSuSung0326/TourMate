import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  placestate: boolean;
};
const initialState: InitialState = {
  placestate: false,
};

const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    open6: (state) => {
      state.placestate = true;
    },
    close6: (state) => {
      state.placestate = false;
    },
  },
});

export default placeSlice.reducer;
export const { open6, close6 } = placeSlice.actions;
