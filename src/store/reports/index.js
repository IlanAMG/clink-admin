import { createSlice } from "@reduxjs/toolkit";
import { fetchAllReports } from "./features";

export const reports = createSlice({
    name: "reports",
    initialState: {
        reports: [],
        isLoading: true,
        isError: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllReports.fulfilled, (state, { payload }) => {
                state.reports = payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchAllReports.pending, (state, { payload }) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllReports.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default reports.reducer;

export const reportsSelector = (state) => state.reports;