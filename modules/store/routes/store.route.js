import { Router } from "express";


const router = Router();

router.get("/",);

router.get("/:storeId",);

// Requires authenticated seller
router.post("/",);

//Requires store owner (seller) authentication
router.patch("/:storeId",);
router.delete("/:storeId",);