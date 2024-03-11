import { Router } from "express";
import {
  signup,
  login,
  getLocation,
  uploadAvatar,
  changePassword,
  verifyEmail,
  resendCode,
} from "../controllers/user.controller.js";
import {
  signupValidation,
  loginValidation,
} from "../validators/user.validation.js";
import validator from "../../../validation/common.validation.js";
import authentication from "../../../middlewares/authentication.js";
import { uploadSingle } from "../../../utils/multer.js";

const router = Router();

router.post("/signup", validator(signupValidation), signup);
router.get("/login", validator(loginValidation), login);


router.use(authentication);
router.get("/verify-email", verifyEmail);
router.get("/resend-code", resendCode);

router.get("/location", getLocation);
router.post("/upload-avatar", uploadSingle, uploadAvatar);
router.patch("/change-password", changePassword);

export default router;
