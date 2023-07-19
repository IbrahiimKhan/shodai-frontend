import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { get } from "http";

interface Product {
    // Define the properties of a single product
}

type ProductSlice = Product[];

const initialState: ProductSlice = [];

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProductsData: (state, action: PayloadAction<Product[]>) => {
            return[...state, action.payload]
        },
        getProductsData: (state, action: PayloadAction<Product[]>) => {
            return action.payload;
        },
    },
});

export const { setProductsData, getProductsData } = productSlice.actions;
export default productSlice.reducer;
