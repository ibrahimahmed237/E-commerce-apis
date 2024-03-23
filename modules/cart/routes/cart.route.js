import { Router } from "express";

const router = Router();

// Auth
router.get("/");
router.post("/items");
router.patch("/items/:ItemId");
router.delete("/items/:ItemId");
router.delete("/items");
