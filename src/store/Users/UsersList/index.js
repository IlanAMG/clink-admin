import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersList } from "./features";

export const usersList = createSlice({
  name: "usersList",
  initialState: {
    usersList: [],
    isLoading: true,
    isError: true,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersList.fulfilled, (state, { payload }) => {
        state.usersList = payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchUsersList.pending, (state, { payload }) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUsersList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default usersList.reducer;

export const usersListSelector = (state) => state.usersList;
