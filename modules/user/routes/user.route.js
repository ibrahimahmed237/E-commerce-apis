import { Router } from "express";
import {
  getLocation,
  uploadAvatar,
  changePassword,
  resetPassword,
  forgotPassword,
  verifyPassOtp,
} from "../controllers/user.controller.js";
import { resetPasswordValidation } from "../validators/user.validation.js";
import validator from "../../../validation/common.validation.js";
import authentication from "../../../middlewares/authentication.js";
import { uploadSingle } from "../../../utils/multer.js";

const router = Router();


router.post("/forgot-password/:email?", forgotPassword);
router.post("/verify-pass-otp/:email", verifyPassOtp);
router.patch(
  "/reset-password/:email",
  validator(resetPasswordValidation),
  resetPassword
);
router.use(authentication);

router.post("/location", getLocation);
router.post("/upload-avatar", uploadSingle, uploadAvatar);
router.patch(
  "/change-password",
  validator(resetPasswordValidation),
  changePassword
);

router.get("/:userId", )
router.patch("/:userId", )

// Admin
router.get("/", )
router.delete("/:userId");

export default router;
