import { Router } from "express";
import {
  getLocation,
  uploadAvatar,
  changePassword,
} from "../controllers/user.controller.js";
import { resetPasswordValidation } from "../validators/user.validation.js";
import validator from "../../../validation/common.validation.js";
import authentication from "../../../middlewares/authentication.js";
import { uploadSingle } from "../../../utils/multer.js";

const router = Router();

router.use(authentication);

router.get("/location", getLocation);
router.post("/upload-avatar", uploadSingle, uploadAvatar);
router.patch(
  "/change-password",
  validator(resetPasswordValidation),
  changePassword
);

export default router;
