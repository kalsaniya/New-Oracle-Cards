const express = require("express");
const {
  UserSignin,
  createUser,
  logoutUser,
  updateuser,
  getuser,
  UserSentOtp,
  UserVerifyOtp,
  userRegister,
} = require("../controllers/UserController"); // Import controller
const router = express.Router();

// Define route for user sign-in
router.post("/signin", UserSignin);
router.post("/send-otp", UserSentOtp);
router.post("/verify-otp", UserVerifyOtp);

router.post("/signup", createUser);
router.post("/register", userRegister);

router.post("/logout", logoutUser);
router.put("/updateuser/:id", updateuser);
router.get("/getbyid/:id", getuser);

module.exports = router;
