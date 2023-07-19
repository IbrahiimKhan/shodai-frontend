import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string;
}

const initialState: AuthState = {
    token: localStorage.getItem("token") || "", // Retrieve token from localStorage or set it to an empty string
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload); // Store the token in localStorage
        },
        clearToken: (state) => {
            state.token = "";
            localStorage.removeItem("token"); // Remove the token from localStorage
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
