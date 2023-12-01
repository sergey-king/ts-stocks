import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, View } from "../components/Themed";
import { WatchlistList } from "../components/WatchlistList";
import { useAppSelector } from "../redux/hooks";
import { selectColorScheme } from "../redux/slices/device";

export default function IndexScreen() {
    const colorScheme = useAppSelector(selectColorScheme);
    const [searchName, setSearchName] = useState<string>();

    return (
        <SafeAreaView style={styles.containerSafe} edges={["bottom"]}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.containerInner}>
                        <View style={styles.headerContainer}>
                            <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

                            <TextInput
                                style={styles.searchNameTextInput}
                                onChangeText={setSearchName}
                                value={searchName}
                                autoCapitalize={"none"}
                                placeholder="Search for $AAPL or 'Apple'"
                                placeholderTextColor={colorScheme === "dark" ? "gray" : "lightgray"}
                                clearButtonMode="always"
                            />
                        </View>

                        <WatchlistList filter={searchName} />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerSafe: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
    },
    containerInner: {
        flex: 1,
        justifyContent: "center",
        paddingTop: 16,
    },
    headerContainer: {
        paddingHorizontal: 16,
    },
    searchNameTextInput: {
        padding: 10,
        width: "100%",
        borderWidth: 1,
        borderRadius: 16,
        borderColor: "gray",
        fontWeight: "600",
    },
});
