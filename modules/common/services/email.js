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

export const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
};

export const sendEmail = asyncHandler(async (to, subject, html, next) => {
  const transporter = nodemailer.createTransport(config);
  const msg = await transporter.sendMail({
    from: "E-commerce@gmail.com",
    to,
    subject,
    html,
  });
  if (msg.accepted.length === 0) return false;

  return msg;
});
