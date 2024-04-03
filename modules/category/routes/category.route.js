import { Router } from "express";
import { getCategories } from "../controllers/category.controller.js";

const router = Router();

router.get("/",getCategories);

router.get("/:categoryId");

// Admin
router.post("/",);

router.put("/:categoryId");

router.delete("/:categoryId");

export default router;
