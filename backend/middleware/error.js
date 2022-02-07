const ErrorHandler = require("../utils/error-handler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error (500)";

  if (err.name === "TokenExpiredError") {
    const message = `The Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "CastError") {
    const message = `Resource was not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} was entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `The Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
