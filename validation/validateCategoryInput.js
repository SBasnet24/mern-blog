const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateCategoryInput(req, res, next) {
  let errors = {};
  let { name } = req.body;
  name = !_.isEmpty(name) ? name : "";

  if (!Validator.isLength(name, { min: 2, max: 20 })) {
    errors.name = "Category Name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(name)) {
    errors.name = "Category name field cannot be empty";
  }

  if (!_.isEmpty(errors)) {
    res.status(400).json(errors);
  } else {
    next();
  }
};
