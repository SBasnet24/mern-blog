const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateLoginInput(req, res, next) {
  let errors = {};
  let { email, password } = req.body;

  email = !_.isEmpty(email) ? email : "";
  password = !_.isEmpty(password) ? password : "";

  if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(email)) {
    errors.email = "Email field cannot be empty";
  }
  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (Validator.isEmpty(password)) {
    errors.password = "Password field cannot be empty";
  }

  if (!_.isEmpty(errors)) {
    res.status(400).json(errors);
  } else {
    next();
  }
};
