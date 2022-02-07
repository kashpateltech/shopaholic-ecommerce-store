const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const handleErrorMiddleware = require("./middleware/error");

const app = express();

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const user = require("./routes/user-route");
const product = require("./routes/product-route");
const payment = require("./routes/payment-route");
const order = require("./routes/order-route");

app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", payment);
app.use("/api/v1", order);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(handleErrorMiddleware);

module.exports = app;
