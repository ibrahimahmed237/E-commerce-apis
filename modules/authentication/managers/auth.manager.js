import User from "../../user/models/User.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import appError from "../../../utils/appError.js";
import { otpSending } from "../services/email.js";

export const getUser = asyncHandler(async function (input) {
    let query = [{ email: input }];

    if (mongoose.Types.ObjectId.isValid(input)) {
      query.push({ _id: input });
    }

    let user = await User.findOne({
      $or: query,
    });

    return user;
});

export const createUser = asyncHandler(async function (user, next) {
  user.fullName = `${user.firstName} ${user.lastName}`;

  user = new User(user);
  await user.save();
  if (!user) return next(new appError("User not created", 400));

  if (process.env.NODE_ENV !== "development") {
    const result = await otpSending(user, next);
    if (result === "error" || !result) {
      return next(new appError("Email not sent", 500));
    }
  } else user.isVerified = true;
  await user.save();

  return user;
});
