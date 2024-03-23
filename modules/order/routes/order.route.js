import { Router } from "express";

const router = Router();

// Auth
router.get("/");
router.get("/:orderId");
router.post("/");

router.patch("/:orderId"); //update order status (Admin only or specific actions for user, e.g., cancel order)
/*
- Managing Their Own Products' Orders: You might allow sellers to manage certain aspects of orders related to their          products, such as updating shipping information or modifying order items.

- Limit sellers to updating only those fields that align with their role (e.g., shipping status, not payment status).
*/
