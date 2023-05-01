import axios from 'axios'
import { stateValues } from '../../common/state-values';
import { DEFAULT_ITEMS_ON_PAGE, DEFAULT_START_PAGE } from '../../common/constants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCategory = createAsyncThunk(
    "categoryList/getAll",
    async (payload, options) => {
        const state = options.getState();
        const page = state.categoryList.page;
        const amount = state.categoryList.amount;
        const url = new URL('/category', 'http://localhost:3010/');
        const pagination = {
            skip: (page - 1) * amount,
            take: amount,
        };
        url.searchParams.append("pagination", JSON.stringify(pagination));
        const response = await axios.get(url);
        // console.log(response.data.items);
        return response.data;
    }
);


export const categorySlice = createSlice({
    name: 'categoryList',
    initialState: {
        categories: [],
        error: null,
        totalCount: 0,
        page: DEFAULT_START_PAGE,
        amount: DEFAULT_ITEMS_ON_PAGE,
        status: stateValues.idle,
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
            state.status = stateValues.idle;
        },
        setAmountOnPage: (state, action) => {
            state.amount = action.payload;
            state.page = DEFAULT_START_PAGE;
            state.status = stateValues.idle;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCategory.pending, (state, action) => {
                state.status = stateValues.loading;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.status = stateValues.succeeded;
                state.categories = [...action.payload.items];
                state.totalCount = action.payload.totalCount;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.status = stateValues.failed;
                state.error = action.error.message;
                state.totalCount = 0;
            });

    },
});

export const { setPage, setAmountOnPage } = categorySlice.actions;

export default categorySlice.reducer;