// API Types
export interface StockPrice {
    ticker: string;
    price: number;
}

export interface StockTicker {
    ticker: string;
    companyName: string;
}

// Extended types
// TODO: I'd use something like that If refactor the code to store stocks & prices in the redux store and upsert the updates as needed.
export interface StockTickerExtended {
    ticker: string;
    companyName: string;
    price?: StockPrice;
}
