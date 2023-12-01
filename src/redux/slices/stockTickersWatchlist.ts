import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { StockTicker } from "../types";

export interface StockTickersWatchlist {
    stockTikers: StockTicker[]; // TODO: Map<string, StockTicker>;
}

const initialState: StockTickersWatchlist = {
    stockTikers: [], // TODO: new Map<string, StockTicker>(),
};

// DEVELOPER NOTE:
// If I had to optimize it in the future, I would use a Map instead of an array to store the watchlist items.
// For the sake of simplicity, I'm using lodash's keyBy function to transform the array into a Map at the HOC level.
// Example: const stockWatchlistItemsMap = useMemo(() => keyBy(stockWatchlistItems, "ticker"), [stockWatchlistItems]);

export const stockTickersWatchlistSlice = createSlice({
    name: "stockTickersWatchlistSlice",
    initialState,
    reducers: {
        addStockTickersWatchlistItem: (state, action: PayloadAction<StockTicker>) => {
            state.stockTikers.push(action.payload);
            return state;
        },
        removeStockTickersWatchlistItem: (state, action: PayloadAction<StockTicker>) => {
            const index = state.stockTikers.findIndex((searchRecord) => searchRecord.ticker === action.payload.ticker);
            if (index > -1) {
                state.stockTikers.splice(index, 1);
            }
            return state;
        },
        clearStockTickersWatchlist: (state) => {
            state.stockTikers = [];
            return state;
        },
    },
});

export const selectStockTickersWatchlist = (state: RootState) => state.stockTickersWatchlist.stockTikers;

export const { addStockTickersWatchlistItem, removeStockTickersWatchlistItem, clearStockTickersWatchlist } =
    stockTickersWatchlistSlice.actions;

export default stockTickersWatchlistSlice.reducer;
