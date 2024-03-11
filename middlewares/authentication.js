import jsonwebtoken from "jsonwebtoken";
import appError from "../utils/appError.js";
import User from "../modules/user/models/User.js";
import asyncHandler from "express-async-handler";

export default asyncHandler(async function (req, res, next) {
  if (!req.req.header("Authorization"))
    return next(new Error("Unauthorized", 401));

  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) return next(new Error("Unauthorized", 401));

  const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  if (!decoded) return next(new appError("Unauthorized", 401));

  const user = await User.findOne({
    _id: decoded._id,
    "tokens.token": token,
  });
  if (!user) return next(new appError("Unauthorized", 401));
  
  req.user = user;
  req.token = token;
  next();
});
