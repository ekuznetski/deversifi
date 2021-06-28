import React from "react";
import "./sideTable.scss";

export function SideTable({ orders, className }) {
  return (
    <ul className={"side-table " + className}>
      <li className="orderbook-element-header">
        <span>Count</span>
        <span>Amount</span>
        <span>Total</span>
        <span>Price</span>
      </li>
      {orders.map((e) => (
        <li key={e.price} className="orderbook-element">
          <span>{e.count}</span>
          <span>{e.amount.toFixed(2)}</span>
          <span>{e.total.toFixed(2)}</span>
          <span>{e.price.toFixed(2)}</span>
          <span className="bg" style={{ width: `${e.totalPercentage}%` }} />
        </li>
      ))}
    </ul>
  );
}
