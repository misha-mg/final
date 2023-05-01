import { createSlice } from '@reduxjs/toolkit'



export const orderSlice = createSlice({
  name: "orderList",
  initialState: {
    products: [],
    error: null,
  },
  reducers: {
    addToBacket: (state, action) => {
      const found = state.products.findIndex((el) => el.id === action.payload.id)
      if (found < 0) {
        state.products = [...state.products,{ ...action.payload, order: 1}]
      }
    },
    deleteFromBacket: (state, action) => {
      const found = state.products.findIndex((el) => el.id === action.payload.id)
      if (found >= 0) {
        state.products.splice(found, 1);
      }
    },
  },

});

export const { addToBacket, deleteFromBacket } = orderSlice.actions;
export default orderSlice.reducer;
