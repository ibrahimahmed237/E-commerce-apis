import {
  createUser,
  getUser,
  getLocationManager,
  changePasswordManager,
} from "../managers/user.manager.js";
import appError from "../../../utils/appError.js";
import asyncHandler from "express-async-handler";
import cloudinary from "../../../config/cloudinary.js";
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
  let user = await getUser(req.user.id);

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
  let user = await getUser(req.user.id);

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
  if (!user) return next(new appError("User does not exist", 400));

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new appError("Invalid credentials", 400));

  const token = await user.generateAuthToken();
  res.status(200).json({ status: "success", token });
});

const getLocation = asyncHandler(async function (req, res, next) {
  const { longitude, latitude } = req.query || req.body;

  const location = await getLocationManager(latitude, longitude, next);
  const user = getUser(req.user.id);
  user.location = location;
  await user.save();

  res.status(200).json({ status: "success", location });
});

const uploadAvatar = asyncHandler(async function (req, res, next) {
  if (!req.file) return next(new appError("Please upload a file", 400));
  const user = await getUser(req.user.id);

  if (user.avatar) {
    const public_id = user.avatar.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(public_id);
  }
  const result = await cloudinary.uploader.upload(req.file.path);
  if (!result) return next(new appError("Image not uploaded", 400));

  user.avatar = result.secure_url;

  res.status(200).json({ status: "success", avatar: result.secure_url });
});

const changePassword = await changePasswordManager;

export {
  signup,
  verifyEmail,
  resendCode,
  login,
  getLocation,
  uploadAvatar,
  changePassword,
};
