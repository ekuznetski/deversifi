import React, { useContext, useState } from "react";
import { placeOrderRequest } from "../../services/api.service";
import AppContext from "../../AppContext";
import { updateUserOrders } from "../../fn/updateUserOrders";
import { updateOrderbook } from "../../fn/updateOrderbook";
import "./placeOrder.scss";

const initFormData = {
  price: "",
  amount: "",
};

export function PlaceOrder() {
  const [appState, setAppState] = useContext(AppContext); // todo move outside of memo
  const [formState, setFormState] = useState(initFormData);
  const [showMessage, setShowMessage] = useState(false);
  function changeHandler(e) {
    let { name, value } = e.target;
    setFormState((state) => ({ ...state, [name]: value }));
  }
  function submitHandler(e) {
    e.preventDefault();
    const side = e.target.id;
    if (formState.price && formState.amount) {
      const data = {
        ...formState,
        side,
        userId: appState.userId,
      };
      placeOrderRequest(data).then((e) => {
        if (e.status === "success") {
          setFormState(initFormData); // todo clear form
          updateUserOrders(appState.userId, setAppState);
          updateOrderbook(setAppState);
        }
      });
    } else {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  }
  return (
    <div>
      <form className="place-order">
        <h3>Buy/Sell</h3>
        <div className="inputs">
          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              placeholder="0"
              min={0}
              value={formState.price}
              onChange={changeHandler}
            />
          </div>
          <div className="input-group">
            <label htmlFor="amount">Amount</label>
            <input
              name="amount"
              id="amount"
              type="number"
              placeholder="0"
              min={0}
              value={formState.amount}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="buttons">
          <button type="submit" id="bid" onClick={submitHandler}>
            Buy
          </button>
          <button type="submit" id="ask" onClick={submitHandler}>
            Sell
          </button>
        </div>
        {showMessage && (
          <span className="error-msg">Please enter price and amount</span>
        )}
      </form>
    </div>
  );
}
