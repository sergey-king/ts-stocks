import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { StockPrice } from "../types";

export interface StockPrices {
    stockTikers: Map<string, StockPrice>;
}

const initialState: StockPrices = {
    stockTikers: new Map<string, StockPrice>(),
};

export const stockPricesSlice = createSlice({
    name: "stockPricesSlice",
    initialState,
    reducers: {
        addStockPricesItem: (state, action: PayloadAction<StockPrice[]>) => {
            state.stockTikers = new Map<string, StockPrice>(action.payload.map((item) => [item.ticker, item]));
            return state;
        },
    },
});

export const selectStockPrices = (state: RootState) => state.stockPrices.stockTikers;

export const { addStockPricesItem } = stockPricesSlice.actions;

export default stockPricesSlice.reducer;
