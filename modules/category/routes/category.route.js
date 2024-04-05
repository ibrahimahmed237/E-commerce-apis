import { Router } from "express";
import {
  getCategories,
  getCategory,
  createCategory,
} from "../controllers/category.controller.js";
import authentication from "../../../middlewares/authentication.js";
import authorize from "../../../middlewares/authorization.js";

const router = Router();

router.use(authentication);
router.get("/", authorize("category", "read"), getCategories);

router.get("/:categoryId", authorize("category", "read"), getCategory);

router.post("/add", authorize("category", "create"), createCategory);

// router.put("/update/:categoryId", authorize("category", "update"));

// router.delete("/:categoryId", authorize("category", "delete"));

export default router;
