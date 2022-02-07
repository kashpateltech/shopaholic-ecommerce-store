const sendToken = (user, statusCode, res) => {
  const getToken = user.getJWTToken();

  const tokenOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", getToken, tokenOptions).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
