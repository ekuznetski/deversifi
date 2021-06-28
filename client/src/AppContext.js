import { createContext } from "react";

// to simplify app I use context, but ofc it should be redux store
const initState = {
  userId: null,
  userOrders: [],
  orderbook: {},
};
const AppContext = createContext([initState, () => {}]);

export default AppContext;
