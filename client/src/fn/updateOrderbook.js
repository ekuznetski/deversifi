import { getOrderbookRequest } from "../services/api.service";

export function updateOrderbook(setAppState) {
  getOrderbookRequest().then((resp) => {
    const { data } = resp;
    setAppState((state) => ({ ...state, orderbook: data }));
  });
}
