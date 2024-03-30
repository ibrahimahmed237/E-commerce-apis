import { Router } from "express";
import { getWishlist, addProductToWishlist, removeProductFromWishlist } from "../controllers/wishlist.controller.js";
import authentication from "../../../middlewares/authentication.js";

const router = Router();

// Auth
router.use(authentication);

router.get("/", getWishlist);
router.post("/items/productId", addProductToWishlist);
router.delete("/items/productId", removeProductFromWishlist);