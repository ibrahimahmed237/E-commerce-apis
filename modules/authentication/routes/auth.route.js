import { Router } from "express";
import {
  signup,
  login,
  verifyEmail,
  resendCode,
  logout
} from "../controllers/auth.controller.js";
import {
  signupValidation,
  loginValidation,
} from "../validators/auth.validation.js";
import validator from "../../../validation/common.validation.js";
import authentication from "../../../middlewares/authentication.js";

const router = Router();

router.post("/signup", validator(signupValidation), signup);
router.post("/login", validator(loginValidation), login);


router.use(authentication);
router.get("/verify-email", verifyEmail);
router.get("/resend-code", resendCode);

router.get("/logout", logout);

export default router;
