const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const config = require("../config.json");

exports.register = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: "success",
    user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(
      new AppError("Invalid Credentials : Email or Password Incorrect")
    );
  }
  const token = jwt.sign({ id: user._id }, config.secretOrKey, {
    expiresIn: 7200,
  });
  res.status(200).json({
    status: "Success",
    user,
    token,
  });
});
