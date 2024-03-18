import {
  getUser,
  getLocationManager,
  changePasswordManager,
  forgotPasswordManager,
  resetPasswordManager,
  verifyPassOtpManager,
} from "../managers/user.manager.js";
import appError from "../../../utils/appError.js";
import asyncHandler from "express-async-handler";
import cloudinary from "../../../config/cloudinary.js";

export const getLocation = asyncHandler(async function (req, res, next) {
  let user = getUser(req.user._id);
  const { longitude, latitude } = req.query || req.body;

  const location = await getLocationManager(latitude, longitude, next);
  user.location = location;
  user.location.longitude = longitude;
  user.location.latitude = latitude;
  
  await user.save();

  res.status(200).json({ status: "success", location });
});

export const uploadAvatar = asyncHandler(async function (req, res, next) {
  if (!req.file) return next(new appError("Please upload a file", 400));
  const user = await getUser(req.user._id);

  if (user.avatar.public_id) {
    let public_id = user.avatar.public_id;
    await cloudinary.uploader.destroy(public_id);
  }
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "avatar",
    resource_type: "image",
  });
  if (!result) return next(new appError("Image not uploaded", 400));

  user.avatar.url = result.secure_url;
  user.avatar.public_id = result.public_id;
  await user.save();
  res.status(200).json({ status: "success", avatar: user.avatar.url });
});

export const changePassword = changePasswordManager;

export const forgotPassword = asyncHandler(async (req, res, next) => {
  let email = req.body.email || req.params.email;
  email = email.toLowerCase().trim();

  let result = await forgotPasswordManager(email, next);

  if (result !== email)
    return next(new appError("Process didn't succeed", 404));

  return res.status(200).json({
    status: "success",
    message: "Verification code has been sent",
    email,
  });
});

export const verifyPassOtp = asyncHandler(async (req, res, next) => {
  const email = req.params.email.toLowerCase().trim();

  const isVerified = await verifyPassOtpManager(email, req.body.otp, next);
  if (!isVerified) return next(new appError("Invalid OTP", 400));

  return res.status(200).json({
    status: "success",
    message: "Verification succeed.",
  });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const email = req.params.email.toLowerCase().trim();
  let { newPassword } = req.body;

  const user = await resetPasswordManager(email, newPassword, next);
  if (!user) return next(new appError("An error has occured.", 404));

  return res.status(200).json({
    status: "success",
    message: "Password has been reset",
  });
});
