const ordersService = require("../services/orders.service");

function getOrdersForUser(req, res) {
  const { userId } = req.params;
  ordersService.getOrders(Number(userId)).then((e) => {
    return res.status(200).json({
      status: "success",
      data: e,
    });
  });
}

module.exports = getOrdersForUser;
