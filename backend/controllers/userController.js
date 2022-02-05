const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

// User registration

exports.userRegistration = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatar example",
      url: "profileimageUrl",
    },
  });

  const token = user.getJWTToken()
  res.status(201).json({
      success: true,
      token,
  });
});
