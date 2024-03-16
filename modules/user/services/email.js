import appError from "../../../utils/appError.js";
import asyncHandler from "express-async-handler";

import { generateOtp, sendEmail } from "../../common/services/email.js";

export const resetPassEmail = asyncHandler(async (user, next) => {
  const Otp = generateOtp();
  user.passwordOtp.otp = Otp;
  await user.save();

  setTimeout(() => {
    user.passwordOtp.otp = null;
    user.passwordOtp.isVerified = false;
    user.save();
  }, 15 * 60 * 1000); //expires after 15 minutes

  const html = `<h2>Hello ${user.username} </h2>
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="margin-top: 20px;">
            <h3 style="color: #000; font-weight: bold;">E-commerce<br></h3>
            <p style="color: #666;">Your Otp for Resetting  Password:<br></p>
            <p style="color: #333; font-size: 24px; font-weight: bold;">${Otp}</p>
            <p style="color: #666;">Please note that for added security this link becomes invalid after 15 minutes.</p>
        </div>
    </div>`;
  let result = await sendEmail(user.email, "Reset Password", html, next);
  if (!result) {
    return next(new appError("Error in sending email", 500));
  }
  return result;
});
