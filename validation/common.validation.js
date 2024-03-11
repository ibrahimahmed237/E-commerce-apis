import appError from "../utils/appError.js";

// This function is used to validate the request body of a request
export default (schema) => {
  return async (req, res, next) => {
    const { error, value } = await schema(req.body);
    if (error) return next(new appError(error, 400));
    for (let key in value) {
      req.body[key] = value[key];
    }
    next();
  };
};
