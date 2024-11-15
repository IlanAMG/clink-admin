import { createAsyncThunk } from "@reduxjs/toolkit";
import { functionsFetch } from "../../../utils/functionsFetch";

export const fetchOrdersProcessed = createAsyncThunk(
  "orderProcessed/fetchOrdersProcessed",
  async (arg, thunkAPI) => {
    try {
      const response = await functionsFetch({
        method: "GET",
        url: "/ordersProcessed/",
      });
      return response.data;
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
