import { configureStore } from "@reduxjs/toolkit";
import whitelabelListReducer from "./Whitelabel/WhitelabelList";
import allEarningsReducer from "./Whitelabel/Earnings";
import usersListReducer from "./Users/UsersList";
import requestsReducer from "./Requests";
// import ordersListReducer from "./Orders/OrderList";
// import orderProcessedReducer from "./Orders/OrderProcessed";
import linksReducer from "./Links";
import giftsReducer from "./Gifts";
import reportsReducer from "./reports";

export default configureStore({
  reducer: {
    whitelabelList: whitelabelListReducer,
    usersList: usersListReducer,
    // ordersList: ordersListReducer,
    // orderProcessed: orderProcessedReducer,
    requests: requestsReducer,
    links: linksReducer,
    allEarnings: allEarningsReducer,
    gifts: giftsReducer,
    reports: reportsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
