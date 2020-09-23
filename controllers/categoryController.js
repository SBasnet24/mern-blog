const { Category } = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

//@acess Private
// route POST /api/category
// restricted to only admin
exports.createCategory = catchAsync(async (req, res, next) => {
  if (req.user.role !== "admin")
    return next(
      new AppError("You are not authorized to perform this action", 400)
    );
  const category = await Category.create(req.body);
  res.status(200).json({
    status: "success",
    category,
  });
});
exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    status: "success",
    result: categories.length,
    categories,
  });
});
