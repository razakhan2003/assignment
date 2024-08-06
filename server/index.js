require("dotenv").config({
  path: "./config/config.env",
});
const express = require("express");
const { ConnectDB } = require("./config/db");
const { Authentication } = require("./routes");
const httpStatus = require("http-status");
const { errorConverter, errorHandler } = require("./middlewares/error");
const morgan = require("morgan");
const ApiError = require("./utils/ApiError");
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
ConnectDB();

app.use("/api/v1", Authentication);

app.get("/", (req, res) => {
  res.send("working");
});

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
