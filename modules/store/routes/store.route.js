import { Router } from "express";
import authentication from "../../../middlewares/authentication.js";
import authorize from "../../../middlewares/authorization.js";
import Store from "../models/Store.js";

const router = Router();

router.get("/");

router.get(
  "/:storeId",
  authentication,
  authorize("store", "read"),
  async (req, res) => {
    try {
      const { storeId } = req.params;
      const store = await Store.findById(storeId);
      if (!store) {
        return res.status(404).json({ message: "Store not found" });
      }
      res.json(store);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Requires authenticated seller
router.post(
  "/",
  authentication,
  authorize("create", "store"),
  async (req, res, next) => {
    try {
      const { name, description, location, phoneNumber, email, logo } =
        req.body;
      const owner = req.user._id;
      const store = new Store({
        name,
        description,
        location,
        phoneNumber,
        email,
        logo,
        owner,
      });

      await store.save();
      res.status(201).json(store);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

//Requires store owner (seller) authentication
router.patch("/:storeId");
router.delete("/:storeId");

export default router;
