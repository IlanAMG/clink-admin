import {createAsyncThunk} from "@reduxjs/toolkit";
import {functionsFetch} from "../../../utils/functionsFetch";


export const fetchOrdersList= createAsyncThunk(
    'ordersList/fetchOrdersList',
    async (arg, thunkAPI) => {
        try {
           const response =  await functionsFetch({
                method: 'GET',
                url: '/orders/',
            })
            return response.data
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)

