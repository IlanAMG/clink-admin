import {createSlice} from '@reduxjs/toolkit'
import {fetchOrdersProcessed} from "./features";


export const orderProcessed = createSlice({
    name: 'orderProcessed',
    initialState: {
        orderProcessedList: [],
        isLoadingOrderProcessed: true,
        isError: true,
    },
    reducers: {
        deleteOrderProcessedById: (state, {payload}) => {
            var list = state.orderProcessedList.filter(x => x.orderId !==payload)
            state.orderProcessedList = list
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrdersProcessed.fulfilled, (state, {payload}) => {
            state.orderProcessedList = payload;
            state.isLoadingOrderProcessed = false;
            state.isError = false;
        }).addCase(fetchOrdersProcessed.pending, (state, {payload}) => {
            state.isLoadingOrderProcessed = true;
            state.isError = false;
        }).addCase(fetchOrdersProcessed.rejected, (state, {payload}) => {
            state.isLoadingOrderProcessed = false;
            state.isError = true;
        })
    }
})


export default orderProcessed.reducer


export const orderProcessedSelector = (state) => state.orderProcessed;

export const {deleteOrderProcessedById} = orderProcessed.actions


