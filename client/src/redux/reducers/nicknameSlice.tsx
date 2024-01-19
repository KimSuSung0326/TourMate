import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  nicknamestate: boolean;
};
const initialState: InitialState = {
  nicknamestate: false,
};

const nicknameSlice = createSlice({
  name: 'nickname',
  initialState,
  reducers: {
    open3: (state) => {
      state.nicknamestate = true;
    },
    close3: (state) => {
      state.nicknamestate = false;
    },
  },
});

export default nicknameSlice.reducer;
export const { open3, close3 } = nicknameSlice.actions;
