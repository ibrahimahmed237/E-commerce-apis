import express from "express";
import {
  signupController,
  loginController,
  getLocation,
} from "../controllers/user.controller.js";
import {
  signupValidation,
  loginValidation,
} from "../validators/user.validation.js";
import validator from "../../../validation/common.validation.js";
import authentication from "../../../middlewares/authentication.js";

const router = express.Router();

router.post("/signup", validator(signupValidation), signupController);
router.get("/login", validator(loginValidation), loginController);

router.use(authentication);
router.get("/location", getLocation);

export default router;