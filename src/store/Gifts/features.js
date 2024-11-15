import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllGifts } from "../../modules/gifts";

export const fetchGifts = createAsyncThunk(
  "gifts/fetchGifts",
  async (arg, thunkAPI) => {
    try {
      const response = await getAllGifts();
      return response;
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
