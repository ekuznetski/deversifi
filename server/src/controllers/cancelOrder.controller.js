const state = require("../state");
const ordersService = require("../services/orders.service");

function cancelOrder(req, res) {
  //todo validate req params

  // I am not sure why I need user ID , because order ID is uniq and it's enough. If you want use userID for security reason to be sure that user can cancel only their own orders, I am also think that user session is enough because you can handle it on backend and don't need pass userID
  const { orderId, userID } = req.body;
  ordersService.cancelOrder(Number(orderId)).then((e) => {
    //todo service should check if order exists and return success of failure response. I skip it to save time
    return res.status(200).json({
      status: "success",
      data: e,
    });
  });
}

module.exports = cancelOrder;
