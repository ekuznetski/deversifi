const state = require("../state");

function getOrderbook(req, res) {
  return res.status(200).json({
    status: "success",
    data: state.orderbook,
  });
}

module.exports = getOrderbook;
