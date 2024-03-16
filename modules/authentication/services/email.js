import appError from "../../../utils/appError.js";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const config = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
};

const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
};

const sendEmail = asyncHandler(async (to, subject, html, next) => {
  const transporter = nodemailer.createTransport(config);
  const msg = await transporter.sendMail({
    from: "E-commerce@gmail.com",
    to,
    subject,
    html,
  });
  if (msg.accepted.length === 0) return "error";

  return msg;
});

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
  if (result === "error") {
    await user.deleteOne();
    return new appError("Error in sending email", 500);
  }
  return result;
});