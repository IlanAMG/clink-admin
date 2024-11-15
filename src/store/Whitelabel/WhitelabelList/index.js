import {createSlice} from '@reduxjs/toolkit'
import {fetchWhitelabelList} from "./features";


export const whitelabelList = createSlice({
    name: 'whitelabelList',
    initialState: {
        whiteLabelList: [],
        whiteLabelNameList :[],
        selectedWhiteLabel :"All whitelabels",
        isLoading: true,
        isError: true,
    },
    reducers: {
        updateSelectedWhiteLabel : (state, {payload}) => {
        state.selectedWhiteLabel = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWhitelabelList.fulfilled, (state, {payload}) => {
            state.whiteLabelList = payload;
            state.whiteLabelNameList = [
                "All whitelabels",
                ...payload.map(x => x.slug)
            ]
            state.isLoading = false;
            state.isError = false;
        }).addCase(fetchWhitelabelList.pending, (state, {payload}) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(fetchWhitelabelList.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})


export default whitelabelList.reducer


export const whitelabelListSelector = (state) => state.whitelabelList;

export const {updateSelectedWhiteLabel} = whitelabelList.actions


