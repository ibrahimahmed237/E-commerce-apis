import {
  getUser,
  getLocationManager,
  changePasswordManager,
} from "../managers/user.manager.js";
import appError from "../../../utils/appError.js";
import asyncHandler from "express-async-handler";
import cloudinary from "../../../config/cloudinary.js";

export const getLocation = asyncHandler(async function (req, res, next) {
  let user = getUser(req.user._id);
  const { longitude, latitude } = req.query || req.body;

  const location = await getLocationManager(latitude, longitude, next);
  user.location = location;
  await user.save();

  res.status(200).json({ status: "success", location });
});

export const uploadAvatar = asyncHandler(async function (req, res, next) {
  if (!req.file) return next(new appError("Please upload a file", 400));
  const user = await getUser(req.user._id);

  if (user.avatar) {
    const public_id = user.avatar.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(public_id);
  }
  const result = await cloudinary.uploader.upload(req.file.path);
  if (!result) return next(new appError("Image not uploaded", 400));

  user.avatar = result.secure_url;
  await user.save();
  res.status(200).json({ status: "success", avatar: result.secure_url });
});

export const changePassword = changePasswordManager;