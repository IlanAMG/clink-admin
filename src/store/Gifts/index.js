import { createSlice } from "@reduxjs/toolkit";
import { fetchGifts } from "./features";

export const gifts = createSlice({
  name: "gifts",
  initialState: {
    value: [],
    loading: true,
    error: true,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchGifts.fulfilled, (state, { payload }) => {
        state.value = payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchGifts.pending, (state, { payload }) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchGifts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default gifts.reducer;

export const giftsSelector = state => state.gifts;
