const state = require("../state");
const helpers = require("../helpers");
const orderbookLength = 25;
function addTotalAndSlice(arr) {
  if (arr.length > orderbookLength) arr = arr.slice(0, orderbookLength);
  let total = 0;
  arr = arr.map((e) => {
    total += e.amount;
    return { ...e, total };
  });
  return arr;
}
function addTotalPercentage(arr, biggestTotal) {
  return arr.map((e) => ({
    ...e,
    price: helpers.roundDecimal(e.price, helpers.stateSettings.precisionPrice),
    amount: helpers.roundDecimal(
      e.amount,
      helpers.stateSettings.precisionAmount
    ),
    total: helpers.roundDecimal(e.total, helpers.stateSettings.precisionAmount),
    totalPercentage: Math.round((e.total / biggestTotal) * 100),
  }));
}

function updateOrderbook() {
  return new Promise((rs) => {
    const orderbook = {
      bids: {},
      asks: {},
    };
    const orders = Object.values(state.orders);
    for (let i = 0; i < orders.length; i++) {
      const { amount, price } = orders[i];
      const side = amount > 0 ? "bids" : "asks";
      let pp = {
        price,
        amount: Math.abs(amount),
        count: 1,
      };
      if (!!orderbook[side][price]) {
        orderbook[side][price] = {
          price,
          amount: Math.abs(orderbook[side][price].amount) + Math.abs(amount),
          count: orderbook[side][price].count + 1,
        };
      } else {
        orderbook[side][price] = pp;
      }
    }
    orderbook.bids = Object.values(orderbook.bids);
    orderbook.asks = Object.values(orderbook.asks);

    orderbook.bids.sort((a, b) => a.price - b.price);
    orderbook.asks.sort((a, b) => b.price - a.price);

    orderbook.bids = addTotalAndSlice(orderbook.bids);
    orderbook.asks = addTotalAndSlice(orderbook.asks);

    const biggestTotal = Math.max(
      orderbook.bids[orderbookLength - 1].total,
      orderbook.asks[orderbookLength - 1].total
    );

    orderbook.bids = addTotalPercentage(orderbook.bids, biggestTotal);
    orderbook.asks = addTotalPercentage(orderbook.asks, biggestTotal);

    state.orderbook = orderbook;
    return rs(orderbook);
  });
}

const ordersService = {
  // to simplify I call updateOrderbook immediately, but obviously it should be more complex logic. maybe emit event when new orders added. and to optimise performance regenerate orderbook one time per second, or per half of second
  getOrders: (userId = null) =>
    new Promise((rs) => {
      if (userId)
        rs(Object.values(state.orders).filter((e) => e.userId === userId));
      else rs(Object.values(state.orders));
    }),
  addOrder: (newOrder) =>
    new Promise((rs) => {
      newOrder.id = helpers.generateId();
      state.orders[newOrder.id] = newOrder;
      updateOrderbook().then(() => {
        rs(newOrder.id);
      });
    }),
  cancelOrder: (orderId) =>
    new Promise((rs) => {
      //todo service should check if order exists and return success of failure response. I skip it to save time
      delete state.orders[orderId];
      updateOrderbook().then(() => {
        rs(orderId);
      });
    }),
  updateOrderbook,
};

module.exports = ordersService;
