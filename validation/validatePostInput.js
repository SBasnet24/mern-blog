const Validator = require("validator");
const _ = require("lodash");

module.exports = function validatePostInput(req, res, next) {
  let errors = {};
  let { title, body, category, description } = req.body;
  title = !_.isEmpty(title) ? title : "";
  description = !_.isEmpty(description) ? description : "";
  body = !_.isEmpty(body) ? body : "";
  // category = !_.isEmpty(category) ? category : "";

  if (!Validator.isLength(title, { min: 2, max: 80 })) {
    errors.title = "Title must be between 2 and 80 characters";
  }
  if (Validator.isEmpty(title)) {
    errors.title = "Title field cannot be empty";
  }
  // if (!Validator.isLength(description, { min: 2, max: 120 })) {
  //   errors.description = "Description must be between 2 and 120 characters";
  // }
  if (Validator.isEmpty(description)) {
    errors.description = "Description field cannot be empty";
  }
  if (Validator.isEmpty(body)) {
    errors.body = "Body field cannot be empty";
  }

  // if (Validator.isEmpty(category)) {
  //   errors.category = "Category field cannot be empty";
  // }
  if (!_.isEmpty(errors)) {
    res.status(400).json(errors);
  } else {
    next();
  }
};
