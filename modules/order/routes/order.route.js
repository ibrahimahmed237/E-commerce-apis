import { Router } from "express";

const router = Router();

// Auth
router.get("/");
router.get("/:orderId");
router.post("/");


//update order status (Admin only or specific actions for user, e.g., cancel order)
router.patch("/:orderId/status"); // (admin or seller with specific permissions)  // Update order status
router.delete("/:orderId/cancel "); // (authenticated user with specific window)  // Cancel order (optional)
router.get("/history/:orderId")
/*
- Admins: You might allow admins to update any field in an order, such as the payment status or shipping status. 
- Managing Their Own Products' Orders: You might allow sellers to manage certain aspects of orders related to their          products, such as updating shipping information or modifying order items.

- Limit sellers to updating only those fields that align with their role (e.g., shipping status, not payment status)

*/
