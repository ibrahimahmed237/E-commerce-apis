import rbac from "../modules/rbac/rbac.js";
import { appError } from "./errorHandler.js";

// Authorization middleware
export default (action, resource) => async (req, res, next) => {
  try {
    const { user } = req;
    if (!user || !user.isVerified)
      return next(new appError("Unauthorized", 401));

    // Check if the user has permission to perform the action on the resource
    const allowed = await rbac.can(user.role, action, resource);
    if (!allowed) return next(new appError("Forbidden, limited access.", 403));

    // If the user has permission, continue to the next middleware
    next();
  } catch (err) {
    next(new appError(err.message, 500));
  }
};
