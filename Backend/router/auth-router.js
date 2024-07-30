const express = require("express");
const router = express.Router();
const authControllers = require("../Controllers/auth-controller");
const updateUser =require("../Controllers/auth-controller")
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");
const { signupSchema, loginSchema } = require("../validators/auth-validator");


router.route("/").get(authControllers.home);
router.route("/register").post(validate(signupSchema), authControllers.register);
router.route("/login").post(validate(loginSchema), authControllers.login);


router.route("/user").get(authMiddleware, authControllers.user);


router.route("/updateUser").patch(authMiddleware, authControllers.updateUser);

// otp verification
// router.route("/sendOtp").post(otpMailvalidator, authControllers.sendOtp);





module.exports = router;
