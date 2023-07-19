import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {};

const orderSlice = createSlice({
    name: "order",
    initialState: localStorage.getItem("singleOrder")
        ? JSON.parse(localStorage.getItem("singleOrder")!)
        : initialState,
    reducers: {
        setOrdersData: (state, action: any) => {
            const newState = action.payload;
            localStorage.setItem("singleOrder", JSON.stringify(newState));
            return newState;
        },
    },
});

export const { setOrdersData, } = orderSlice.actions;
export default orderSlice.reducer;
