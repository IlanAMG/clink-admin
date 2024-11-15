import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../../firebase";

export const fetchWhitelabelList = createAsyncThunk(
  "whitelabelList/fetchWhitelabelList",
  async (arg, thunkAPI) => {
    try {
      const whitelabelsCol = collection(db, "whitelabels");
      const whitelabelsSnapShot = await getDocs(whitelabelsCol);
      const whitelabelsList = whitelabelsSnapShot.docs.map((doc) => doc.data());

      return whitelabelsList;
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
