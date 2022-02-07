const catchAsyncErrors = require("../middleware/catch-async-errors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "aud",
    metadata: {
      company: "Shopaholic",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});
