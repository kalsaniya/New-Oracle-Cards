// const User = require("../models/UserModels");

const User = require("../models/UserSchema");
const UserOtp = require("../models/UserOtp");
const savecard = require("../models/SavedCard");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

// email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // user: process.env.EMAIL,
    // pass: process.env.EMAIL_PASSWORD,
    user: "abhiasthana36@gmail.com",
    pass: "opff wtfk kuwz aygu",
  },
});

const userRegister = asyncHandler(async (req, res) => {
  const { fname, email, password } = req.body;

  if (!fname || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Please log in." });
    }

    const newUser = new User({ fname, email, password });

    // Hash password before saving
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

const UserSignin = asyncHandler(async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) {
    return res.status(400).json({ message: "Mobile number is required." });
  }
  try {
    const user = await User.findOne({ mobile });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please sign up first." });
    }

    const token = jwt.sign(
      { userId: user._id, mobile: user.mobile },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .status(200)
      .json({ message: "User authenticated successfully!", user, token });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

const UserSentOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "User not found. Please sign up first." });
  }
  
  console.log(email);

  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(otp);
  const otpEntry = await UserOtp.findOneAndUpdate(
    { email },
    { otp },
    { new: true, upsert: true }
  );

  console.log(otpEntry);

  await otpEntry.save();
  console.log("Email:", process.env.EMAIL);
  console.log("Password:", process.env.EMAIL_PASSWORD ? "Loaded" : "Missing");

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP Verification",
    html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 400px; margin: auto;">
          <h2 style="color: #007bff; text-align: center;">OTP Verification</h2>
          <p style="font-size: 16px; text-align: center;">Use the OTP below to verify your email:</p>
          <div style="font-size: 24px; font-weight: bold; color: #333; background: #f8f9fa; padding: 10px; text-align: center; border-radius: 5px;">
            ${otp}
          </div>
          <p style="text-align: center; font-size: 14px; color: #666;">This OTP is valid for 10 minutes.</p>
          <hr>
          <p style="text-align: center; font-size: 12px; color: #999;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send OTP email." });
    }
    res.status(200).json({ message: "OTP sent successfully!" });
  });
});

const UserVerifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required." });
  }

  const otpEntry = await UserOtp.findOne({ email });
  if (!otpEntry || otpEntry.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP. Please try again." });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "User not found. Please sign up first." });
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res
    .status(200)
    .json({ message: "User authenticated successfully!", user, token });
});

const createUser = asyncHandler(async (req, res) => {
  const mobile = req.body.mobile;
  const findUser = await User.findOne({ mobile: mobile });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    res.status(400).json({ error: "User with this Mobile already exists" });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Logout failed. Please try again." });
        }
        res.status(200).json({ message: "User logged out successfully!" });
      });
    } else {
      res.status(200).json({ message: "User logged out successfully!" });
    }
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

const updateuser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const userupdate = await User.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true }
    );

    if (!userupdate) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(userupdate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getuser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch user data
    const userget = await User.findOne({ _id: id });

    if (!userget) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch saved card details
    const savedCards = await savecard.find({ _id: { $in: userget.savedcard } });

    res.status(200).json({ user: userget, savedCards });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  UserSignin,
  createUser,
  logoutUser,
  updateuser,
  getuser,
  userRegister,
  UserSentOtp,
  UserVerifyOtp,
};
