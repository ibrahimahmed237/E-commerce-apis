import { RBAC } from "rbac";

const rbac = new RBAC({
  roles: ["superAdmin", "admin", "seller", "customer"],
  permissions: {
    order: ["create", "read", "update"],
    product: ["create", "read", "update", "delete"],
    store: ["create", "read", "update", "delete"],
    user: ["create", "read", "update", "delete"], // User-related permissions (careful with delete!)
    admin: ["create", "read", "update", "delete"], // Allow reading admin details
    orderHistory: ["read"], // Allow reading order history
    category: ["create", "read", "update", "delete"], // Category-related permissions
    wishlist: ["read", "update", "delete"], // Wishlist-related permissions
    review: ["create", "read", "update", "delete"], // Review-related permissions
    cart: ["read", "update", "delete"], // Cart-related permissions
  },
  grants: {
    customer: ["order.*", "read_own_cart", "wishlist.*", "review.*", "cart.*"],
    admin: [
      "order.*",
      "product.*",
      "store.*",
      "user.*",
      "orderHistory.read",
      "category.*",
      "wishlist.*",
      "review.*",
      "cart.*",
    ], // Admins have full access
    seller: [
      "customer",
      "product.create",
      "product.read_own",
      "product.update_own",
      "store.create",
      "store.read",
      "store.update",
      "store.delete",
    ], // Sellers can create/read own products, read all orders, and create/read their own orders.
    superAdmin: ["admin", "admin.*"], // SuperAdmin inherits admin permissions.
  },
});

await rbac.init(); // Initialize RBAC system
