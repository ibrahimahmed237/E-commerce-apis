import { Router } from "express";
import authentication from "../../../middlewares/authentication.js";
import authorize from "../../../middlewares/authorization.js";
import Store from "../models/Store.js";

const router = Router();

router.get("/");

router.get("/:storeId", authentication, authorize("store", "read"));

// Requires authenticated seller
router.post("/", authentication, authorize("create", "store"));

//Requires store owner (seller) authentication
router.patch("/:storeId");
router.delete("/:storeId");

export default router;
