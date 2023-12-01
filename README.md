# Stocks Watchlist - React Native Project

https://github.com/sergey-king/ts-stocks/assets/48575848/b77830de-69f0-416f-ae31-1c8a7b91e47f

## Setup
This project is bootstrapped with `npx create-expo-app -t expo-template-blank-typescript`. 
For simplicity in testing, use the `Expo Go` client, but it can be modified to use EAS builds with development clients.
The project uses the latest EXPO SDK, version 49.

## Requirenmetns
- Xcode + latest Xcode command tools
- NPM
- Expo CLI

## Commands
- Run `npm install expo-cli --global`
- Run `npm i` inside the project folder
- Check TypeScript: `npm run ts:check`
- Check lint: `npm run lint`
- Start in production mode: `npm run start:production`
- Start in development mode: `npm run start`

Once Metro has started, press `i` to open the iOS simulator.

## Dev Notes & Performance Optimitizations 
After the initial load, when adding or removing stocks from the watchlist, you will notice that only the specific stock line item gets re-rendered, rather than updating or re-rendering the entire list.

Price updates occur every 5 seconds. Only stock line items experiencing a price change will get re-rendered, thus avoiding the need to update or re-render the entire list.

With more time, we can introduce a Redux slice for price/stocks and upsert price updates on updates, instead of fetching the data directly from the RTK Query. This approach will enable us to move away from or add to PureComponent/React.Memo() for comparison mechanisms, and will establish a single source of truth as our application scales, since we would rely on a global state instead.

## Navigation 
This project uses the newest Expo Router (next-generation file-based navigation - https://docs.expo.dev/routing/introduction/). It can also be configured with the latest React Navigation (https://reactnavigation.org/) if preferred.

## State Management
Redux with Redux Toolkit is used. This is the official Redux wrapper that simplifies most Redux tasks and eliminates a lot of boilerplate code (https://redux.js.org/introduction/why-rtk-is-redux-today).

## Data Persistance
Persistance is achieved suing Redux Persist (https://github.com/rt2zz/redux-persist) + RTK Query Persistence And Rehydration (https://redux-toolkit.js.org/rtk-query/usage/persistence-and-rehydration) in combination with React Native AsyncStorage (https://github.com/react-native-async-storage/async-storage)

## Data Fetching
RTK Query is employed. Similar to React Query but made to work with Redux/RTK (https://redux-toolkit.js.org/rtk-query/overview). This provides both data fetching and caching.

## Code Quality 
- eslint
- eslint-plugin-react
- eslint-plugin-react-native
- eslint-plugin-react-hooks

## Code Formatting 
- prettier

## TODO & Improvements
- Implement Styled Components/Emotion + Theming provider with Emotion.
- Add NetworkProvider to monitor network state and display connection state warnings/errors.
- Enhance error handling with Sentry Integration and performance profiling.
- Integrate analytics and screen tracking (Customer.io/Amplitude/GA, etc.).
- Develop Redux Slice tests and component tests.
- Improve GitHub setup with husky pre-commit hooks, automatic linting, and test runs.

## Extras
Latest Redux with RTK Toolkit & RTK Query was used because it's the most common and popular state manager/data fetching among react-native community. However, I would be interested in completing this assessment using next-gen state management libraries like Recoil (by Facebook - https://recoiljs.org/), Jotai (https://jotai.org/), or Zustand (https://docs.pmnd.rs/zustand/getting-started/introduction).
