import { createUser, getUser } from "../managers/userManager.js";
import appError from "../../../utils/appError.js";
import asyncHandler from "express-async-handler";

const signupController = asyncHandler(async function (req, res, next) {
  const { firstName, lastName, email, password, address, phoneNumber } =
    req.body;

  let user = await getUser(email);
  if (user) return next(new appError("User already exists", 400));

  const newUser = await createUser(
    firstName,
    lastName,
    email,
    password,
    address,
    phoneNumber
  );

  if (!newUser) return next(new appError("User not created", 400));
  res.status(201).json({ status: "success" });
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

export { signupController, loginController };
