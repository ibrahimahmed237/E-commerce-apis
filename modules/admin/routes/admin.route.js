import { Router } from "express";
import appError from "../../../utils/appError.js";
import authorize from "../../../middlewares/authorization.js";
import authentication from "../../../middlewares/authentication.js";

const router = Router();

router.use(authentication);


router.get("/users", authorize("readAll", "user")); // get all users

router.delete("/users/:userId", authorize("delete", "user")); // delete user

export default router;
