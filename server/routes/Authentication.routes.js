const express = require("express");
// const { Register } = require("../controllers/Authentication.controllers");
const { AuthenticationController } = require("../controllers");
const validate = require("../middlewares/validate");
const { createUser,loginUser,ContactDetails } = require("../validations/user.validation");
const verifyJWT = require("../middlewares/verifyToken");
// const { upload } = require("../utils/uploads");

const router = express.Router();
// router.route("/register").post(Register)

router.route("/register").post(validate(createUser),AuthenticationController.register)
router.route("/login").post(validate(loginUser),AuthenticationController.loginController)

router.route("/profile").get(verifyJWT,AuthenticationController.profileController)

module.exports = router;
