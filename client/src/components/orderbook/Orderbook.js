import React, { useContext, useEffect } from "react";
import AppContext from "../../AppContext";
import { updateOrderbook } from "../../fn/updateOrderbook";
import { SideTable } from "./sideTable/SideTable";
import "./orderbook.scss";

export function OrderbookMemo({ orderbook }) {
  return orderbook.asks.length ? (
    <div className="orderbook">
      <SideTable className="bids" orders={orderbook.bids} />
      <SideTable className="asks reverse" orders={orderbook.asks} />
    </div>
  ) : null;
}

export function Orderbook() {
  const [appState, setAppState] = useContext(AppContext);
  useEffect(() => {
    updateOrderbook(setAppState);
  }, []);
  return appState.orderbook ? (
    <OrderbookMemo orderbook={appState.orderbook} />
  ) : null;
}
