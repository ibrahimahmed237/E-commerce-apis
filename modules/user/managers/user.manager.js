import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import appError from "../../../utils/appError.js";
import axios from "axios";
import { resetPasswordValidation } from "../validators/user.validation.js";
import { otpSending, resetPassEmail } from "../services/email.js";
const getUser = asyncHandler(async function (email, id) {
  if (id) return await User.findById(id);
  return await User.findOne({ email });
});

const createUser = asyncHandler(async function (user, next) {
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

const getLocationManager = asyncHandler(async (lat, lon, next) => {
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

const updateUser = asyncHandler(async function (id, data) {
  const user = await User.findByIdAndUpdate(id, data);
  return user;
});

const changePasswordManager = asyncHandler(async (req, res, next) => {
  const user = req.user;
  
  const isPassMatch = await user.passwordMatch(req.body.oldPassword);
  if (!isPassMatch)
    return next(
      new appError("Old password is Invalid , please try again", 400)
    );

  if (req.body.oldPassword === req.body.newPassword)
    return next(
      new appError("New password can't be the same as old password", 400)
    );

  req.body.password = req.body.newPassword;
  const { value, error } = resetPasswordValidation(req.body);
  if (error) return next(new appError(error, 400));

  const { password } = value;

  user.password = password;
  await user.save();

  return res.status(200).json({
    status: "success",
    message: "Password has been changed",
  });
});

export {
  getUser,
  createUser,
  getLocationManager,
  updateUser,
  changePasswordManager,
};
