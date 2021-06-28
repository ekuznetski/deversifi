const ordersService = require("../services/orders.service");

function placeOrder(req, res) {
  //todo validate req params
  const { price, amount, side, userId } = req.body;
  const newOrder = {
    userId: Number(userId),
    price: Number(price),
    amount: Number(side === "bid" ? amount : -amount),
  };
  console.log(req.body);
  ordersService.addOrder(newOrder).then((e) => {
    // todo one function to generate responses
    return res.status(200).json({
      status: "success",
      data: e,
    });
  });
}

module.exports = placeOrder;
