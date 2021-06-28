const router = require("express").Router();
const rateLimit = require("express-rate-limit");
const controllers = require("../controllers");
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 500,
});

router.use("/v1/", apiLimiter);
router.post("/v1/placeOrder", controllers.placeOrder);
router.post("/v1/cancelOrder", controllers.cancelOrder);
router.get("/v1/getOrderbook", controllers.getOrderbook);
router.get("/v1/getOrdersForUser/:userId", controllers.getOrdersForUser);

module.exports = router;
