import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  modalType: string;
  isOpen: boolean;
};
const initialState: InitialState = {
  modalType: '',
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, actions) => {
      const { modalType } = actions.payload;
      state.modalType = modalType;
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
});

export default modalSlice.reducer;
export const { open, close } = modalSlice.actions;
