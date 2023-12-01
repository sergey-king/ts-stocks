import Ionicons from "@expo/vector-icons/Ionicons";
import keyBy from "lodash/keyBy";
import React, { useCallback, useMemo, useState } from "react";
import { Alert, RefreshControl, SectionList, SectionListData, SectionListRenderItemInfo, StyleSheet } from "react-native";
import { useGetTickersPriceQuery, useGetTickersQuery } from "../redux/api";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearStockTickersWatchlist, selectStockTickersWatchlist } from "../redux/slices/stockTickersWatchlist";
import { StockTicker } from "../redux/types";
import { filterStockWatchlistItems } from "../utils/filters";
import { Text, View } from "./Themed";
import WatchlistListItem from "./WatchlistListItem";

type WatchlistListProps = {
    filter?: string;
};
export function WatchlistList({ filter }: WatchlistListProps) {
    const dispatch = useAppDispatch();

    const stockWatchlistItems = useAppSelector(selectStockTickersWatchlist); // get the watchlist items from the redux store. This will be updated when the watchlist changes

    const [isRefreshing, setIsRefreshing] = useState(false);

    // Fetching data from the API
    // data is cached by default so we don't need to worry about caching it ourselves. Additionally, the data is persisted https://redux-toolkit.js.org/rtk-query/usage/persistence-and-rehydration
    const { data: tickersData, refetch: tickersRefetch } = useGetTickersQuery(); // tickers data fill be featch on the first render
    const { data: priceData, refetch: priceDataRefetch } = useGetTickersPriceQuery(
        Object(tickersData?.map((item: StockTicker) => item.ticker)),
        {
            skip: !tickersData, // we're only going to fetch the price data if we have the tickers data
            pollingInterval: 5000, // 5 seconds interval to refetch the price data
        }
    );

    // Quick lookup maps for the tickers and price data
    const stockPriceMap = useMemo(() => keyBy(priceData, "ticker"), [priceData]);
    const stockWatchlistItemsMap = useMemo(() => keyBy(stockWatchlistItems, "ticker"), [stockWatchlistItems]);

    // Pull to refresh. Here we're refetching the tickers and price data
    const handleOnRefresh = useCallback(async () => {
        setIsRefreshing(true);

        await tickersRefetch();
        await priceDataRefetch();

        setIsRefreshing(false);
    }, [tickersRefetch, priceDataRefetch]);

    const handleOnClearWatchlistPress = useCallback(() => {
        Alert.alert("Clear Watchlist", "Are you sure you want to clear your watchlist?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Clear",
                style: "destructive",
                onPress: () => {
                    dispatch(clearStockTickersWatchlist());
                },
            },
        ]);
    }, [dispatch]);

    const keyExtractor = useCallback((item: StockTicker) => {
        return item.ticker;
    }, []);

    const renderItem = useCallback(
        (itemInfo: SectionListRenderItemInfo<StockTicker>) => {
            const isWatchlist = stockWatchlistItemsMap[itemInfo.item.ticker] ? true : false;
            const stockPrice = stockPriceMap[itemInfo.item.ticker];

            return <WatchlistListItem stockTicker={itemInfo.item} isWatchlist={isWatchlist} stockPrice={stockPrice} />;
        },
        [stockPriceMap, stockWatchlistItemsMap]
    );

    const renderItemSeparatorComponent = useCallback(() => {
        return <View style={styles.itemSeparatorContainer} />;
    }, []);

    const renderSectionHeader = useCallback(
        (info: { section: SectionListData<StockTicker, { title: string; data: StockTicker[] }> }) => {
            const {
                section: { title, data },
            } = info;
            if (data.length === 0) return null; // don't render the section header if there's no data (empty section)

            return (
                <View style={styles.listHeaderContainer}>
                    <Text style={styles.listHeaderTitle}>{title}</Text>
                    {title === "Your Watchlist" ? (
                        <Ionicons name="close-circle" size={18} color={"gray"} onPress={handleOnClearWatchlistPress} />
                    ) : null}
                </View>
            );
        },
        [handleOnClearWatchlistPress]
    );

    const renderListEmptyComponent = useCallback(() => {
        return (
            <View style={styles.listEmptyContainer}>
                <Text style={styles.listEmptyTitle}>Stock List is Empty</Text>
                <Ionicons name="list-circle-outline" size={64} color="lightgray" />
            </View>
        );
    }, []);

    const sections = useMemo(
        () => [
            {
                title: "Your Watchlist",
                data: filterStockWatchlistItems(filter, stockWatchlistItems),
            },
            {
                title: "All Stocks",
                data: filterStockWatchlistItems(filter, tickersData),
            },
        ],
        [filter, stockWatchlistItems, tickersData]
    );

    return (
        <SectionList
            alwaysBounceVertical={false}
            sections={sections}
            extraData={stockWatchlistItems}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            windowSize={10}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleOnRefresh} />}
            ItemSeparatorComponent={renderItemSeparatorComponent}
            ListEmptyComponent={renderListEmptyComponent}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
    },
    contentContainer: {
        paddingHorizontal: 16,
    },
    listHeaderTitle: {
        fontSize: 16,
        fontWeight: "700",
    },
    listHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "lightgray",
    },
    itemSeparatorContainer: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "lightgray",
    },
    listEmptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
    },
    listEmptyTitle: {
        color: "lightgray",
        fontSize: 16,
        fontWeight: "500",
        paddingVertical: 8,
    },
});
