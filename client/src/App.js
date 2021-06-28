import { useState } from "react";
import { Header } from "./components/header/Header";
import AppContext from "./AppContext";
import { Orderbook } from "./components/orderbook/Orderbook";
import { PlaceOrder } from "./components/placeOrder/PlaceOrder";
import { OrderList } from "./components/orderList/OrderList";
import "./app.scss";

function App() {
  const [appState, setAppState] = useState({
    userId: 123,
  });
  return (
    <AppContext.Provider value={[appState, setAppState]}>
      <Header />
      <div className="app">
        <Orderbook />
        <PlaceOrder />
        <OrderList />
      </div>
    </AppContext.Provider>
  );
}

export default App;
