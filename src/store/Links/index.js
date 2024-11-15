import { createSlice } from "@reduxjs/toolkit";
import { fetchLinks } from "./features";

export const links = createSlice({
  name: "links",
  initialState: {
    links: [],
    isLoading: true,
    isError: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLinks.fulfilled, (state, { payload }) => {
        state.links = payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchLinks.pending, (state, { payload }) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchLinks.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default links.reducer;

export const linksSelector = (state) => state.links;
