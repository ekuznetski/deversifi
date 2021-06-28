const state = require("./state");
const stateSettings = {
  ordersLength: 1000,
  minPrice: 1935,
  maxPrice: 1940,
  precisionPrice: 1,
  minAmount: 0.001,
  maxAmount: 10,
  precisionAmount: 2,
};
function roundDecimal(num, precision) {
  let res;
  res = Number(num.toFixed(precision));
  return res;
}

let id = 0;
function generateId() {
  return id++;
}

function fillOrders() {
  return new Promise((rs) => {
    const orders = {};
    for (let i = 0; i < stateSettings.ordersLength; i++) {
      orders[i] = {
        userId: 0,
        id: generateId(),
        price: roundDecimal(
          Math.random() * (stateSettings.maxPrice - stateSettings.minPrice) +
            stateSettings.minPrice,
          stateSettings.precisionPrice
        ),
        amount: roundDecimal(
          Math.random() * (stateSettings.maxAmount - stateSettings.minAmount) +
            stateSettings.minAmount,
          stateSettings.precisionAmount
        ),
        side: i % 2 === 0 ? "ask" : "bid",
      };
    }
    state.orders = orders;
    rs(orders);
  });
}
const helpers = {
  fillOrders,
  stateSettings,
  roundDecimal,
  generateId,
};
module.exports = helpers;
