import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ColorSchemeName } from "react-native";
import { RootState } from "../store";

export interface Theme {
    theme: ColorSchemeName;
}

const initialState: Theme = {
    theme: "light",
};

// DEVELOPER NOTE: usually I would use react-native-appearance (useColorScheme hoom) to detect the user's device color scheme,
// but for the sake of simplicity, I'm using a redux slice to store the user's color scheme preference. This allows us to have a header swith to toggle between light and dark mode in the simulator without going to settings.
export const appSettingsSlice = createSlice({
    name: "appSettingsSlice",
    initialState,
    reducers: {
        setColorScheme: (state, action: PayloadAction<"dark" | "light">) => {
            state.theme = action.payload;
            return state;
        },
    },
});

export const selectColorScheme = (state: RootState) => state.appSettings.theme;

export const { setColorScheme } = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
