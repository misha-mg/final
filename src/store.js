import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./pages/product/slice";
import categoryReducer from "./pages/category/slice";
import orderReducer from "./modals/order/slice";
import currencyReducer from "./pages/currency/slice";


export default  configureStore({
    reducer: {
        productList: productReducer,
        categoryList: categoryReducer,
        order: orderReducer,
        currencyList: currencyReducer,
    }
});