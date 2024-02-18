import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  selectedPlace: [];
};

const initialState: InitialState = {
  selectedPlace: [],
};

const setSelectedPlace = createSlice({
  name: 'setplace',
  initialState,
  reducers: {
    setPlaceList: (state, action) => {
      return {
        ...state,
        selectedPlace: action.payload,
      };
    },
  },
});
export default setSelectedPlace.reducer;
export const { setPlaceList } = setSelectedPlace.actions;
