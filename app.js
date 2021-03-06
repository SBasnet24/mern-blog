const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { json, urlencoded } = require("body-parser");
const passport = require("passport");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const authRouter = require("./routers/authRouter");
const postRouter = require("./routers/postRouter");
const userRouter = require("./routers/userRouter");
const categoryRouter = require("./routers/categoryRouter");
const path = require("path");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(passport.initialize());
require("./utils/passport")(passport);
app.get("/", (req, res) => {
  res.json({
    route: "/api/posts",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/category", categoryRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
