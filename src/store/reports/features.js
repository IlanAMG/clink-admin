import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllReports } from "../../modules/reports"

export const fetchAllReports = createAsyncThunk(
    "reports/fetchAllReports",
    async (arg, thunkAPI) => {
        try {
            const responseData = await getAllReports();
            return responseData;
        } catch (e) {
            console.log("Error", e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);