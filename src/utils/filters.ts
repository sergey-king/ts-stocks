import { StockTicker } from "../redux/types";

export function filterStockWatchlistItems(filter?: string, stockWatchlistItems?: StockTicker[]) {
    if (!filter) return stockWatchlistItems || [];

    const lowerCaseFilter = filter.toLowerCase();
    return (
        stockWatchlistItems?.filter(
            ({ ticker, companyName }) =>
                ticker.toLowerCase().includes(lowerCaseFilter) || companyName.toLowerCase().includes(lowerCaseFilter)
        ) || []
    );
}
