const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateRegisterInput(req, res, next) {
  let errors = {};
  let { name, email, password, confirmPassword } = req.body;
  name = !_.isEmpty(name) ? name : "";
  email = !_.isEmpty(email) ? email : "";
  password = !_.isEmpty(password) ? password : "";
  confirmPassword = !_.isEmpty(confirmPassword) ? confirmPassword : "";
  if (!Validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(name)) {
    errors.name = "Name field cannot be empty";
  }
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
  if (!Validator.equals(password, confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }
  if (!_.isEmpty(errors)) {
    res.status(400).json(errors);
  } else {
    next();
  }
};
