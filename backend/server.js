const app = require("./app");
const connectDatabase = require("./config/db");
const cloudinary = require("cloudinary");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

connectDatabase();

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server shutting down due to Uncaught Exception`);
  process.exit(1);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server shutting down due to Uncaught Exception`);

  server.close(() => {
    process.exit(1);
  });
});
