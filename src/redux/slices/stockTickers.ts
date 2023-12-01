import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { StockTicker } from "../types";

export interface StockTickers {
    stockTikers: Map<string, StockTicker>;
}

const initialState: StockTickers = {
    stockTikers: new Map<string, StockTicker>(),
};

export const stockTickersSlice = createSlice({
    name: "stockTickersSlice",
    initialState,
    reducers: {
        addStockTickersItem: (state, action: PayloadAction<StockTicker[]>) => {
            state.stockTikers = new Map<string, StockTicker>(action.payload.map((item) => [item.ticker, item]));
            return state;
        },
    },
});

export const selectStockTickers = (state: RootState) => state.stockTickers.stockTikers;

export const { addStockTickersItem } = stockTickersSlice.actions;

export default stockTickersSlice.reducer;
