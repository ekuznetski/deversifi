import axios from "axios";
// obviously this service should be more complex )
const apiUrl = "http://localhost:5000/v1";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export function getOrderbookRequest() {
  return axios.get(`${apiUrl}/getOrderbook`).then((e) => e.data);
}

export function getOrdersForUserRequest(userId) {
  // in redux we can take all data from store without passing userId as argument
  return axios.get(`${apiUrl}/getOrdersForUser/${userId}`).then((e) => e.data);
}

export function cancelOrderRequest(data) {
  return axios.post(`${apiUrl}/cancelOrder`, data, config).then((e) => e.data);
}

export function placeOrderRequest(data) {
  return axios.post(`${apiUrl}/placeOrder`, data, config).then((e) => e.data);
}

// I prefer to have one high order function 'request' which I use like a request factory
