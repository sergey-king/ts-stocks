import Ionicons from "@expo/vector-icons/Ionicons";
import currency from "currency.js";
import { useRouter } from "expo-router";
import React, { memo, useCallback, useRef } from "react";
import isEqual from "react-fast-compare";
import { StyleSheet, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Colors from "../constants/Colors";
import { useAppDispatch } from "../redux/hooks";
import { addStockTickersWatchlistItem, removeStockTickersWatchlistItem } from "../redux/slices/stockTickersWatchlist";
import { StockPrice, StockTicker } from "../redux/types";
import { Text, View } from "./Themed";

type Props = {
    stockTicker: StockTicker;
    stockPrice?: StockPrice;
    isWatchlist?: boolean;
};

function WatchlistListItem({ stockTicker, stockPrice, isWatchlist }: Props) {
    // DEVELOPER NOTE: This console.log() is here to help you debug number of renders while price/watchlist updates. You can remove it if you want.
    // __DEV__ && console.log("WatchlistListItem rendered", stockTicker.ticker);

    const refSwipeable = useRef<Swipeable>(null);

    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleOnListstockTickerPress = useCallback(() => {
        // expo router doesn't support boolean navigation params yet so we're passing a string instead
        router.push({
            pathname: "/modal",
            params: { ticker: stockTicker.ticker, companyName: stockTicker.companyName, isWatchlist: isWatchlist ? "true" : "" },
        });
    }, [isWatchlist, stockTicker.companyName, stockTicker.ticker, router]);

    const handleOnRemoveAction = useCallback(() => {
        dispatch(removeStockTickersWatchlistItem(stockTicker));
        refSwipeable.current?.close();
    }, [dispatch, stockTicker]);

    const handleOnAddAction = useCallback(() => {
        dispatch(addStockTickersWatchlistItem(stockTicker));
        refSwipeable.current?.close();
    }, [dispatch, stockTicker]);

    const renderRightActions = useCallback(() => {
        if (isWatchlist) {
            return (
                <TouchableOpacity onPress={handleOnRemoveAction}>
                    <View lightColor="red" darkColor="red" style={styles.rightActionsContainer}>
                        <Ionicons name="remove-circle" size={24} color="white" />
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity onPress={handleOnAddAction}>
                <View lightColor={Colors.light.primaryColor} darkColor={Colors.dark.primaryColor} style={styles.rightActionsContainer}>
                    <Ionicons name="add-circle" size={24} color="white" />
                </View>
            </TouchableOpacity>
        );
    }, [handleOnAddAction, handleOnRemoveAction, isWatchlist]);

    return (
        <Swipeable ref={refSwipeable} renderRightActions={renderRightActions}>
            <TouchableOpacity onPress={handleOnListstockTickerPress} style={styles.containerOuter}>
                <View style={styles.leftContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.titleText}>
                            ${stockTicker.ticker} {isWatchlist ? <Ionicons name="star" size={14} color="gold" /> : null}
                        </Text>
                        <Text style={styles.titleText}>{stockTicker.companyName}</Text>
                    </View>
                </View>

                {stockPrice && (
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>{currency(stockPrice?.price).format()}</Text>
                    </View>
                )}

                <View style={styles.rightContainer}>
                    <Ionicons name="chevron-forward" size={24} color="lightgray" />
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
}

// "Pure component" - React.memo() is a higher order component that will re-render the component only if the props change.
// isEqual is a function that will do a deep comparison of the props to determine if they are equal. This is the fastest availbe deep comparison function.
// Learn more: https://www.npmjs.com/package/react-fast-compare
export default memo(WatchlistListItem, isEqual);

const styles = StyleSheet.create({
    containerOuter: {
        flexDirection: "row",
        flex: 1,
    },
    leftContainer: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 8,
        paddingVertical: 16,
    },
    nameContainer: {
        flex: 1,
        justifyContent: "center",
    },
    titleText: {
        fontSize: 14,
        fontWeight: "500",
    },
    priceText: {
        fontSize: 14,
        fontWeight: "700",
    },
    priceContainer: {
        justifyContent: "center",
        alignstockTickers: "center",
        paddingHorizontal: 8,
        paddingVertical: 16,
    },
    rightContainer: {
        justifyContent: "center",
        alignstockTickers: "center",
        paddingHorizontal: 8,
        paddingVertical: 16,
    },
    rightActionsContainer: {
        flex: 1,
        justifyContent: "center",
        alignstockTickers: "center",
        padding: 16,
    },
});
