const express = require("express");
const { register, login } = require("../controllers/authController");
const validateRegisterInput = require("../validation/validateRegisterInput");
const validateLoginInput = require("../validation/validateLoginInput");
const router = express.Router();

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);

module.exports = router;
