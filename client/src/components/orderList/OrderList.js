import React, { memo, useContext, useEffect } from "react";
import AppContext from "../../AppContext";
import { cancelOrderRequest } from "../../services/api.service";
import { updateUserOrders } from "../../fn/updateUserOrders";
import { updateOrderbook } from "../../fn/updateOrderbook";
import "./orderList.scss";

const OrderListMemo = memo(function ({ userOrders, cancelOrder }) {
  //it should be dispatching an action, and after request save response via saga to the global store
  function clickHandler(e) {
    //todo use redux instead context, create hooks for each kind of operation, use saga.
    // in this here I'll only dispath action - "cancelOrder" and saga will update list with orders and orderbook
    cancelOrder(e.target.id);
  }
  return (
    <div>
      <div className="order-list">
        <h3>Orders</h3>
        {!!userOrders.length ? (
          <ul onClick={clickHandler}>
            <li className="order-list-element-header">
              <span>Amount</span>
              <span>Price</span>
              <span>Side</span>
              <span />
            </li>
            {userOrders.map((e) => (
              <li key={e.id} className="order-list-element">
                <span>{e.amount}</span>
                <span>{e.price}</span>
                <span>{e.side}</span>
                <span>
                  <button id={e.id} className="order-cancel-button">
                    Cancel
                  </button>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">Empty</div>
        )}
      </div>
    </div>
  );
});

export function OrderList() {
  const [appState, setAppState] = useContext(AppContext);
  function cancelOrder(id) {
    const data = { orderId: id };
    cancelOrderRequest(data).then((e) => {
      // todo сделать консистентные данные, везде использовать side вместо положительного/отрицательного amount
      updateUserOrders(appState.userId, setAppState);
      updateOrderbook(setAppState);
    });
  }
  useEffect(() => {
    updateUserOrders(appState.userId, setAppState);
  }, []);

  return appState.userOrders ? (
    <OrderListMemo {...{ userOrders: appState.userOrders, cancelOrder }} />
  ) : null;
}
