import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import  appError  from "../../../utils/appError.js";
import e from "express";

const getUser = asyncHandler(async function (email, id) {
  if (id) return await User.findById(id);
  return await User.findOne({ email });
});

const createUser = asyncHandler(async function (
  firstName,
  lastName,
  email,
  password,
  address,
  phoneNumber
) {
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    address,
    phoneNumber,
  });
  return user;
});
 export { getUser, createUser };