import { getOrdersForUserRequest } from "../services/api.service";

export function updateUserOrders(userId, setAppState) {
  getOrdersForUserRequest(userId).then((resp) => {
    const { data } = resp;
    setAppState((state) => ({ ...state, userOrders: data }));
  });
}
