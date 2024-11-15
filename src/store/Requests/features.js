import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../firebase";

export const fetchRequests = createAsyncThunk(
  "requests/fetchRequests",
  async (arg, thunkAPI) => {
    try {
      const requestsCol = collection(db, "whitelabelRequests");
      const requestsSnapShot = await getDocs(requestsCol);
      const requestsList = requestsSnapShot.docs.map((doc) => doc.data());
      return requestsList.sort((a, b) => a.createdAt - b.createdAt);
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
