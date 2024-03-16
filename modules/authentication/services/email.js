import appError from "../../../utils/appError.js";
import asyncHandler from "express-async-handler";
import { generateOtp, sendEmail } from "../../common/services/email.js";

export const otpSending = asyncHandler(async (user, next) => {
  const Otp = generateOtp();
  user.otp = Otp;
  await user.save();

  setTimeout(() => {
    user.otp = null;
    user.save();
  }, 90 * 60 * 1000); //expires after 1:30 hours

  const html = `<h2>Hello ${user.username} </h2>
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="margin-top: 20px;">
            <h3 style="color: #000; font-weight: bold;">E-commerce<br></h3>
            <p style="color: #666;">Your verification code is:<br></p>
            <p style="color: #333; font-size: 24px; font-weight: bold;">${Otp}</p>
            <p style="color: #666;">Please note that for added security this link becomes invalid after 1:30 hours.</p>
        </div>
    </div>`;
  let result = await sendEmail(user.email, "Verify your email", html, next);
  if (!result) {
    await user.deleteOne();
    return new appError("Error in sending email", 500);
  }
  return result;
});