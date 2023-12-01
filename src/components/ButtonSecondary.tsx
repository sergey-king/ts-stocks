import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../components/Themed";

type Props = {
    title: string;
    onPress: () => void;
    lightColor?: string;
    darkColor?: string;
    isDisabled?: boolean;
};

export function ButtonSecondary({ title, onPress, lightColor, darkColor, isDisabled }: Props) {
    return (
        <TouchableOpacity onPress={onPress} disabled={isDisabled} style={styles.container}>
            <Text lightColor={lightColor} darkColor={darkColor} style={isDisabled ? [styles.titleText, styles.disabled] : styles.titleText}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    titleText: {
        fontSize: 16,
        fontWeight: "500",
    },
    disabled: {
        opacity: 0.5,
    },
});
