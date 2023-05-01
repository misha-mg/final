import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { stateValues } from '../../common/state-values';
import { DEFAULT_ITEMS_ON_PAGE, DEFAULT_START_PAGE } from '../../common/constants';


export const fetchProducts = createAsyncThunk(
    "productList/getALL",
    async () => {
      const response = await Promise.all([
        axios.get("http://localhost:3010/product"),
        axios.get("http://localhost:3010/category"),
      ]);
      const [products, categories] = response;
      if (products.data.items.length && categories.data.items.length) {
        return products.data.items
          .map((el) => {
            const id = el.category;
            const category = categories.data.items.find((elC) => elC.id === id);
            return { ...el, category };
          })
          .reduce((acc, el) => {
            let categoryIndex = acc.findIndex(
              (accEl) => el.category.id === accEl.categoryId
            );
            let category;
            if (categoryIndex < 0) {
              category = {
                categoryName: el.category.name,
                categoryId: el.category.id,
                products: [],
              };
              acc.push(category);
            } else {
              category = acc[categoryIndex];
            }
            category.products.push(el);
            return acc;
          }, []);
      }
      return response.data;
    }
  );
  export const ProductSlice = createSlice({
    name: "productList",
    initialState: {
      value: 100,
      products: [],
      error: null,
      page: DEFAULT_START_PAGE,
      amount: DEFAULT_ITEMS_ON_PAGE,
      status: stateValues.idle,
    },
    reducers: {
      toIdleStatus: (state) => {
        state.status = stateValues.idle;
      },
    },
    extraReducers(builder) {
      builder
        .addCase(fetchProducts.pending, (state, action) => {
          state.status = stateValues.loading;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.status = stateValues.succeeded;
          state.products = [...action.payload];
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.status = stateValues.failed;
          state.error = action.error.message;
        });
    },
  });

  export const { toIdleStatus } = ProductSlice.actions;
  export default ProductSlice.reducer;
  