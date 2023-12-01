import Ionicons from "@expo/vector-icons/Ionicons";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Switch } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectColorScheme, setColorScheme } from "../redux/slices/device";
export { ErrorBoundary } from "expo-router";

export default function RootNavigator() {
    const router = useRouter();

    const dispatch = useAppDispatch();
    const colorScheme = useAppSelector(selectColorScheme);

    const handleOnToggleTheme = useCallback(() => {
        const nextColorScheme = colorScheme === "light" ? "dark" : "light";
        dispatch(setColorScheme(nextColorScheme));
    }, [colorScheme, dispatch]);

    const handleOnGoBack = useCallback(() => {
        router.back();
    }, [router]);

    const isDarkModeEnabled = colorScheme === "dark";
    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        headerTitle: "Albert Stocks Watchlist",
                        headerRight: () => {
                            return (
                                <Switch
                                    trackColor={{ false: "#767577", true: "white" }}
                                    thumbColor={isDarkModeEnabled ? "#2A64F6" : "#2A64F6"}
                                    onValueChange={handleOnToggleTheme}
                                    value={isDarkModeEnabled}
                                />
                            );
                        },
                    }}
                />
                <Stack.Screen
                    name="modal"
                    options={{
                        presentation: "modal",
                        headerTitle: "Stock Info",
                        headerRight: () => {
                            return (
                                <Ionicons
                                    name="close-circle"
                                    size={32}
                                    color={colorScheme === "light" ? "black" : "white"}
                                    onPress={handleOnGoBack}
                                />
                            );
                        },
                    }}
                />
            </Stack>
        </ThemeProvider>
    );
}
