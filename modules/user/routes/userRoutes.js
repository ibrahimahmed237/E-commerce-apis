import express from "express";
import {signupController,loginController} from "../controllers/userCtr.js";
import {
  signupValidation,
  loginValidation,
} from "../validators/userValidation.js";
import validator from "../../../validation/commonValidation.js";

const router = express.Router();

router.post("/signup", validator(signupValidation), signupController);
router.get("/login", validator(loginValidation), loginController);

export default router;