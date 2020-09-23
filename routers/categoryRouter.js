const express = require("express");
const passport = require("passport");
const {
  createCategory,
  getAllCategories,
} = require("../controllers/categoryController");
const validateCategoryInput = require("../validation/validateCategoryInput");
const router = express.Router();

router
  .route("/")
  .get(getAllCategories)
  .post(
    passport.authenticate("jwt", { session: false }),
    validateCategoryInput,
    createCategory
  );

module.exports = router;
