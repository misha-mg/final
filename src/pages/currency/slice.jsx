import axios from 'axios'
import { stateValues } from '../../common/state-values';
import { DEFAULT_ITEMS_ON_PAGE, DEFAULT_START_PAGE } from '../../common/constants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCurrency = createAsyncThunk(
    "currencyList/getAll",
    async () => {
        const url = new URL('/currency', 'http://localhost:3010/');
        const response = await axios.get(url);
        return response.data;
    }
);


export const currencySlice = createSlice({
    name: 'currencyList',
    initialState: {
        value: 100,
        currency: [],
        error: null,
        status: stateValues.idle,
    },
    reducers: {
        toIdleStatus: (state) => {
            state.status = stateValues.idle;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCurrency.pending, (state, action) => {
                state.status = stateValues.loading;
            })
            .addCase(fetchCurrency.fulfilled, (state, action) => {
                state.status = stateValues.succeeded;
                state.currency = [...action.payload.items];
                state.totalCount = action.payload.totalCount;
            })
            .addCase(fetchCurrency.rejected, (state, action) => {
                state.status = stateValues.failed;
                state.error = action.error.message;
                state.totalCount = 0;
            });

    },
});

export const { toIdleStatus } = currencySlice.actions;

export default currencySlice.reducer;