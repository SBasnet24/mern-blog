const express = require("express");
const passport = require("passport");
const { getAllUsers } = require("../controllers/userController");
const router = express.Router();

router.get("/", passport.authenticate("jwt", { session: false }), getAllUsers);
module.exports = router;
