import { RBAC } from "rbac";

const rbac = new RBAC({
  roles: ["superAdmin", "admin", "seller", "customer"], // Define roles
  permissions: {
    order: ["create", "read", "update"], // Order-related permissions
    product: ["create", "read", "update", "delete"], // Product-related permissions
    store: ["create", "read", "update", "delete"], // Store-related permissions
    user: ["read", "update", "delete", "readAll"], // User-related permissions (careful with delete!)
    admin: ["create", "read", "update", "delete", "readAll"], // Allow reading admin details
    orderHistory: ["read"], // Allow reading order history
    category: ["create", "read", "update", "delete"], // Category-related permissions
    wishlist: ["read", "update", "delete"], // Wishlist-related permissions
    review: ["create", "read", "update", "delete"], // Review-related permissions.
    cart: ["read", "update", "delete"], // Cart-related permissions.
  },
  grants: {
    customer: [
      "create_order",
      "read_order",
      "update_order",
      "read_wishlist",
      "update_wishlist",
      "delete_wishlist",
      "create_review",
      "read_review",
      "update_review",
      "delete_review",
      "read_cart",
      "update_cart",
      "delete_cart",
      "read_store",
      "read_product",
      "read_category",
      "read_orderHistory",
      "read_user",
    ], // Customers have limited access.
    admin: [
      "customer",
      "readAll_user", // Admins can read all users.
      "create_product",
      "update_product",
      "delete_product",
      "create_store",
      "read_store",
      "update_store",
      "delete_store",
      "update_user",
      "delete_user",
      "create_admin",
      "read_admin",
      "create_category",
      "update_category",
      "delete_category",
      "delete_review",
    ], // Admins have full access except two SuperAdmin permissions.
    seller: [
      "customer",
      "create_store",
      "read_store",
      "update_store",
      "delete_store",
      "create_product",
      "update_product",
      "delete_product",
    ],
    superAdmin: ["admin", "delete_admin", "update_admin", "readAll_admin"], // SuperAdmin inherits admin permissions in addition to 2 permissions.
  },
});

await rbac.init(); // Initialize RBAC system.

export default rbac;
