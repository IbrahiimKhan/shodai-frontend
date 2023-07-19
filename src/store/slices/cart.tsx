import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
    _id: string;
    // Add other properties of your cart item
}

type CartSlice = CartItem[];

const initialState: CartSlice = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")!)
    : [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartData: (state, action) => {
            const newItem: CartItem = action.payload;
            const existingItemIndex = state.findIndex(
                (item) => item._id === newItem._id
            );

            if (existingItemIndex !== -1) {
                // If the item already exists, update it
                state[existingItemIndex] = newItem;
            } else {
                // If the item doesn't exist, add it to the state
                state.push(newItem);
            }

            localStorage.setItem("cart", JSON.stringify(state)); // Store the cart data in localStorage
        },
        deleteCartData: (state, action) => {
            const itemId: string = action.payload._id;
            const updatedCart = state.filter((item) => item._id !== itemId);
            state.splice(0, state.length, ...updatedCart);

            localStorage.setItem("cart", JSON.stringify(state)); // Store the updated cart data in localStorage
        },
        //remove whole cart
        clearCartData: (state,) => {
            state.splice(0, state.length);
            localStorage.setItem("cart", JSON.stringify(state)); // Store the updated cart data in localStorage
        }
    },
});

export const { setCartData, deleteCartData, clearCartData } = cartSlice.actions;
export default cartSlice.reducer;
