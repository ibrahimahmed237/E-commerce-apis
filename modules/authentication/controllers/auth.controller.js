import {
  createUser,
  getUser,
} from "../managers/auth.manager.js";
import appError from "../../../utils/appError.js";
import asyncHandler from "express-async-handler";
import { otpSending } from "../services/email.js";

const signup = asyncHandler(async function (req, res, next) {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  let user = await getUser(email);
  if (user) return next(new appError("User already exists", 400));
  user = {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
  };
  const newUser = await createUser(user, next);
  const token = await newUser.generateAuthToken();

  res.status(201).json({ status: "success", token });
});

const verifyEmail = asyncHandler(async (req, res, next) => {
  let user = await getUser(req.user._id);

  if (user.isVerified)
    return next(new appError("You have already verified your email", 400));

  let otp = Number(req.body.otp);
  if (otp !== user.otp) {
    return next(new appError("Invalid verification code", 400));
  }

  user.isVerified = true;
  user.otp = null;
  user.counter = 0;
  await user.save();

  return res.status(200).json({
    status: "success",
    message: "Email has been verified.",
  });
});

const resendCode = asyncHandler(async (req, res, next) => {
  let user = await getUser(req.user._id);

  if (user.isVerified)
    return next(new appError("You have already verified your email", 400));

  user.counter++;

  if (user.counter > 5) {
    setTimeout(() => {
      user.counter = 0;
      user.save();
    }, 10 * 60 * 1000);
    return next(
      new appError(
        "You have exceeded the maximum number of attempts, try again later",
        400
      )
    );
  }
  await otpSending(user, next);

  return res.status(200).json({
    status: "success",
    message: "Verification code has been sent",
  });
});

const login = asyncHandler(async function (req, res, next) {
  const { email, password } = req.body;

  const user = await getUser(email);
  if (!user) return next(new appError("Invalid credentials", 400));

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new appError("Invalid credentials", 400));

  const token = await user.generateAuthToken();
  res.status(200).json({ status: "success", token });
});

const logout = asyncHandler(async function (req, res, next) {
  req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
  await req.user.save();
  res.status(200).json({ status: "success", message: "Logged out" });
});

export {
  signup,
  verifyEmail,
  resendCode,
  login,
  logout,
};
