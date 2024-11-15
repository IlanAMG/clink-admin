import { createSlice } from "@reduxjs/toolkit";
import { fetchRequests } from "./features";

export const requests = createSlice({
  name: "requests",
  initialState: {
    requests: [],
    isLoading: true,
    isError: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.fulfilled, (state, { payload }) => {
        state.requests = payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchRequests.pending, (state, { payload }) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchRequests.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default requests.reducer;

export const requestsSelector = (state) => state.requests;
