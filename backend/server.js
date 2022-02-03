const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
  console.log(`Server error due to uncaught exception`);
})

// Config
dotenv.config({ path: "backend/config/config.env" });

//connecting to database
connectDatabase();

const serverError = app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:$(process.env.PORT)`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server error due to unhandled promise rejection`);

  serverError.close(() => {
    process.exit(1);
  });
});
