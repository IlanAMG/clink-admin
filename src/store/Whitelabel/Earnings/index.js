import { createSlice } from '@reduxjs/toolkit'
import { fetchAllEarnings } from "./features";


export const allEarnings = createSlice({
    name: 'allEarnings',
    initialState: {
        allEarnings: [],
        isLoading: true,
        isError: true,
    },
    reducers: {
        // deleteOrderProcessedById: (state, {payload}) => {
        //     var list = state.allEarnings.filter(x => x.orderId !== payload)
        //     state.orderProcessedList = list
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllEarnings.fulfilled, (state, { payload }) => {
            state.allEarnings = payload;
            state.isLoading = false;
            state.isError = false;
        }).addCase(fetchAllEarnings.pending, (state, { payload }) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(fetchAllEarnings.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

export default allEarnings.reducer

export const allEarningsSelector = (state) => state.allEarnings;

// export const { deleteOrderProcessedById } = allEarnings.actions


