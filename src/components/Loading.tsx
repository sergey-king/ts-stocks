import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "./Themed";

export function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
