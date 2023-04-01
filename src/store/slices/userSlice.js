import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  phoneNumber: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.phoneNumber = action.payload.phoneNumber;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.phoneNumber = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
