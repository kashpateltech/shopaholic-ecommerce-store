const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catch-async-errors");
const User = require("../models/user-model");
const ErrorHandler = require("../utils/error-handler");

exports.authorizedRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource `,
          403
        )
      );
    }

    next();
  };
};

exports.userAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { authToken } = req.cookies;

  if (!authToken) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedAuthData = jwt.verify(authToken, process.env.JWT_SECRET);

  req.user = await User.findById(decodedAuthData.id);

  next();
});
