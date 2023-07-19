import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfoState {
    [key: string]: any;
}

const initialState: UserInfoState = {
    // Initialize other fields with appropriate default values
};

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")!)
        : initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfoState>) => {
            const newState = { ...state, ...action.payload };
            localStorage.setItem("userInfo", JSON.stringify(newState));
            return newState;
        },
        clearUserInfo: () => {
            localStorage.removeItem("userInfo");
            return initialState;
        },
    },
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
