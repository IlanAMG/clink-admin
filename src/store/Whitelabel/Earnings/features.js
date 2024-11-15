import { createAsyncThunk } from "@reduxjs/toolkit";
import { functionsFetch } from "../../../utils/functionsFetch";

export const fetchAllEarnings = createAsyncThunk(
    "allEarnings/fetchAllEarnings",
    async (arg, thunkAPI) => {
        try {
            const response = await functionsFetch({
                method: "GET",
                url: "/earnings/",
            });
            return response.data;
        } catch (e) {
            console.log(e)
            console.log("Error", e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
