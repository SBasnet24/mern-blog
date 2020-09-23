const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new AppError("You donot have authority to perform this action", 400)
    );
  }
  const users = await User.find();
  res.status(201).json({
    status: "success",
    result: users.length,
    users,
  });
});
