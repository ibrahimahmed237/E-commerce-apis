import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import appError from "../../../utils/appError.js";
import axios from "axios";
import { getUser as get_user } from "../../authentication/managers/auth.manager.js";
import { resetPassEmail } from "../services/email.js";
export const getUser = get_user;

export const getLocationManager = asyncHandler(async (lat, lon, next) => {
  const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=658c70e9df33d292789867vrca19035`;

  const response = await axios.get(url);
  if (response.error !== undefined || !response.data) {
    return next(
      new appError(response.error.message, response.error.code || 500)
    );
  }
  const { data } = response;
  const address = data.display_name;
  const city = data.address.city;
  const state = data.address.state;
  const country = data.address.country;
  const location = { address, city, state, country };
  return location;
});

export const updateUser = asyncHandler(async function (id, data) {
  const user = await User.findByIdAndUpdate(id, data);
  return user;
});

export const changePasswordManager = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { newPassword } = req.body;

  const isPassMatch = await user.passwordMatch(req.body.oldPassword);
  if (!isPassMatch)
    return next(
      new appError("Old password is Invalid , please try again", 400)
    );

  if (req.body.oldPassword === newPassword)
    return next(
      new appError("New password can't be the same as old password", 400)
    );

  user.password = newPassword;
  await user.save();

  return res.status(200).json({
    status: "success",
    message: "Password has been changed",
  });
});

export const forgotPasswordManager = asyncHandler(async (email, next) => {
  if (!email) return next(new appError("Please provide an email", 400));
  let user = await get_user(email);
  if (!user) return next(new appError("Check your Email.", 404));

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

  await resetPassEmail(user, next);
  return email;
});

export const verifyPassOtpManager = asyncHandler(async (email, otp, next) => {
  if (!email) return next(new appError("Please provide an email", 400));
  let user = await get_user(email);
  if (!user) return next(new appError("User not found", 404));

  otp = Number(otp);
  if (user.passwordOtp.otp !== otp)
    return next(new appError("Otp is not correct.", 400));

  user.passwordOtp.isVerified = true;
  await user.save();
  return user.passwordOtp.isVerified;
});

export const resetPasswordManager = asyncHandler(
  async (email, password, next) => {
    let user = await get_user(email);

    if (!user) return next(new appError("User not found", 404));

    if (!user.passwordOtp.isVerified)
      return next(new appError("Please verify reset Password.", 400));

    const isPassMatch = await user.comparePassword(password);
    if (isPassMatch)
      return next(
        new appError("New password can't be the same as old password", 400)
      );

    user.password = password;
    user.passwordOtp.isVerified = false;
    user.passwordOtp.otp = null;
    user.counter = 0;

    await user.save();
    return user;
  }
);
