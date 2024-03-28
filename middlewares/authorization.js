import rbac from "../modules/rbac/rbac.js";

// Authorization middleware
export default (action, resource) => async (req, res, next) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const allowed = await rbac.can(user.role, action, resource);
    if (!allowed) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (err) {
    next(err);
  }
};
