import {createSlice} from '@reduxjs/toolkit'
import {fetchOrdersList} from "./features";


export const ordersList = createSlice({
    name: 'ordersList',
    initialState: {
        ordersList: [],
        isLoading: true,
        isError: true,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrdersList.fulfilled, (state, {payload}) => {
            state.ordersList = payload;
            state.isLoading = false;
            state.isError = false;
        }).addCase(fetchOrdersList.pending, (state, {payload}) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(fetchOrdersList.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})


export default ordersList.reducer


export const ordersListSelector = (state) => state.ordersList;



