import React from "react";
import { ScrollView as DefaultScrollView, Text as DefaultText, TextInput as DefaultTextInput, View as DefaultView } from "react-native";
import Colors from "../constants/Colors";
import { useAppSelector } from "../redux/hooks";
import { selectColorScheme } from "../redux/slices/device";

type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type ScrollViewProps = ThemeProps & DefaultScrollView["props"];
export type TextInputProps = ThemeProps & DefaultTextInput["props"];

// Develoepr note:
// we ovverride default react-native componetnts with our own implementation to support theaming.
// by default components will use dark/light colors provided by useColorScheme/useSelector(selectColorScheme)
// but you can also manully override them by passing lightColor/darkColor props to the component
export function useThemeColor(props: { light?: string; dark?: string }, colorName: keyof typeof Colors.light & keyof typeof Colors.dark) {
    const theme = useAppSelector(selectColorScheme) ?? "light";
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[theme][colorName];
    }
}

export function Text(props: TextProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

    return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ScrollView(props: ScrollViewProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

    return <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
    const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, "text");

    return <DefaultTextInput style={[{ color, borderColor }, style]} {...otherProps} />;
}
