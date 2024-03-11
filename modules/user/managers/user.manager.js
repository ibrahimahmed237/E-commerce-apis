import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import appError from "../../../utils/appError.js";
import axios from "axios";

const getUser = asyncHandler(async function (email, id) {
  if (id) return await User.findById(id);
  return await User.findOne({ email });
});

const createUser = asyncHandler(async function (user) {
  const { firstName, lastName, email, password, phoneNumber } = user;
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    fullName: `${firstName} ${lastName}`,
  });
  return user;
});

const getLocation = asyncHandler(async (lat, lon, next) => {
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

export { getUser, createUser, getLocation };
