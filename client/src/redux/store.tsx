import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './reducers/modalSlice';
import logoutSlice from './reducers/logoutSlice';
import profileSlice from './reducers/profileSlice';
import nicknameSlice from './reducers/nicknameSlice';
import passwordSlice from './reducers/passwordSlice';
import memoSlice from './reducers/memoSlice';
// store
const store = configureStore({
  reducer: {
    modal: modalSlice,
    logout: logoutSlice,
    profile: profileSlice,
    nickname: nicknameSlice,
    password: passwordSlice,
    memo: memoSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
