import { createUser, getUser, getLocation } from "../managers/user.manager.js";
import appError from "../../../utils/appError.js";
import asyncHandler from "express-async-handler";

const signupController = asyncHandler(async function (req, res, next) {
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
  const newUser = await createUser(user);
  const token = await newUser.generateAuthToken();

  if (!newUser) return next(new appError("User not created", 400));
  res.status(201).json({ status: "success", token });
});

const loginController = asyncHandler(async function (req, res, next) {
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

  const location = await getLocation(latitude, longitude, next);
  const user = getUser(req.user.id);
  user.location = location;
  await user.save();

  res.status(200).json({ status: "success", location });
});
export { signupController, loginController, getLocation };
