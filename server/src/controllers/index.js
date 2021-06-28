const placeOrder = require("./placeOrder.controller");
const cancelOrder = require("./cancelOrder.controller");
const getOrderbook = require("./getOrderbook.controller");
const getOrdersForUser = require("./getOrdersForUser.controller");

const controllers = { placeOrder, cancelOrder, getOrderbook, getOrdersForUser };
module.exports = controllers;
