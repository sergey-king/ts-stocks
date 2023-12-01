import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { StockPrice, StockTicker } from "./types";

const TOKEN = "d2db5753-33f6-4e25-b915-6cbdda7953e7"; // normally this would be an environment variable

// Albert API slice
export const albertApi = createApi({
    reducerPath: "albertApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://app.albert.com/",
        prepareHeaders: (headers) => {
            headers.set("Albert-Case-Study-API-Key", TOKEN);
            return headers;
        },
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        // when persisting the root reducer
        if (action.type === REHYDRATE) {
            return action.payload[reducerPath];
        }

        // when persisting the api reducer
        if (action.type === REHYDRATE && action.key === "root") {
            return action.payload;
        }
    },
    endpoints: (builder) => ({
        getTickers: builder.query<StockTicker[], void>({
            query: () => "casestudy/stock/tickers/",
            // Transform the response to type StockTicker[]
            transformResponse: (response: Record<string, string>) => {
                // Convert Record to Array of Objects
                const sanitizedResponse = Object.entries(response).map(([ticker, companyName]) => ({ ticker, companyName }));
                return sanitizedResponse;
            },
        }),
        getTickersPrice: builder.query<StockPrice[], string[]>({
            query: (tickers) => "casestudy/stock/prices/?tickers=" + tickers,
            // Transform the response to type []
            transformResponse: (response: Record<string, number>) => {
                const sanitizedResponse = Object.entries(response).map(([ticker, price]) => ({ ticker, price }));
                return sanitizedResponse;
            },
        }),
    }),
});

export const { useGetTickersPriceQuery, useLazyGetTickersPriceQuery, useGetTickersQuery, useLazyGetTickersQuery } = albertApi;
