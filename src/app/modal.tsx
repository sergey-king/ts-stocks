import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ButtonPrimary } from "../components/ButtonPrimary";
import { ButtonSecondary } from "../components/ButtonSecondary";
import { ScrollView, Text, View } from "../components/Themed";
import { useAppDispatch } from "../redux/hooks";
import { addStockTickersWatchlistItem, removeStockTickersWatchlistItem } from "../redux/slices/stockTickersWatchlist";

export default function ModalScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ companyName: string; ticker: string; isWatchlist?: string }>();
    const insets = useSafeAreaInsets();

    const dispatch = useAppDispatch();

    const handleOnAddToWatchlistPress = useCallback(() => {
        dispatch(addStockTickersWatchlistItem({ companyName: params.companyName, ticker: params.ticker }));
        router.back();
    }, [dispatch, params.companyName, params.ticker, router]);

    const handleOnRemoveFromWatchlistPress = useCallback(() => {
        dispatch(removeStockTickersWatchlistItem({ companyName: params.companyName, ticker: params.ticker }));
        router.back();
    }, [dispatch, params.companyName, params.ticker, router]);

    const handleOnGoBackPress = useCallback(() => {
        router.back();
    }, [router]);

    return (
        <ScrollView contentContainerStyle={styles.container} alwaysBounceVertical={false} contentInset={{ bottom: insets.bottom }}>
            <StatusBar style={"light"} />

            <View style={styles.containerInner}>
                <Text style={styles.titleText}>Stock Details</Text>

                <View style={styles.divider} />

                <Text>Ticker Symbol: {params.ticker}</Text>
                <Text>Company Name: {params.companyName}</Text>
            </View>

            {params.isWatchlist ? (
                <ButtonPrimary lightColor="red" darkColor="red" onPress={handleOnRemoveFromWatchlistPress} title="Remove From Watchlist" />
            ) : (
                <ButtonPrimary onPress={handleOnAddToWatchlistPress} title="Add To Watchlist" />
            )}

            <ButtonSecondary onPress={handleOnGoBackPress} title="Go Back" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    containerInner: {
        flexGrow: 1,
    },
    titleText: {
        fontSize: 16,
        fontWeight: "600",
        paddingVertical: 8,
    },
    divider: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "lightgray",
        alignSelf: "stretch",
        marginVertical: 8,
    },
});
