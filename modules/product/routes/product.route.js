import { Router } from "express";
import { getProducts } from "../controllers/product.controller.js";

const router = Router();

router.get("/",); //products?category=categoryName  // Get all products in the  category


router.get("/stores/:storeId",);
router.get("/:productId",);


// Requires authenticated seller
router.post("/",);

//Requires product owner (seller) authentication
router.patch("/:productId",);
router.delete("/:productId",);
