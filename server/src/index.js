const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const routes = require("./routes");
const ordersService = require("./services/orders.service");
const helpers = require("./helpers");
const port = 5000;

app.use(compression());
app.use(cors());
app.use(helmet());
app.use(require("morgan")("dev"));
app.use(express.json());
app.use(routes);

app.use((req, res, next) => {
  const err = new Error("Page not exist");
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

helpers.fillOrders().then(() => {
  ordersService.updateOrderbook().then(() => {
    app.listen(port, () =>
      console.info(`Ready to rock on http://localhost:${port} 🤟`)
    );
  });
});
