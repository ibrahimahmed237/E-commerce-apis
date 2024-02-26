import  appError  from "../utils/appError.js";
const devErrorHandler = (res, error) => {
  console.log("Error ", error);
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stackTrace: error.stack,
    statusCode: error.statusCode,
  });
};

const prodErrorHandler = (res, error) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      statusCode: error.statusCode,
    });
  } else {
    console.log("Error ", error);
    res.status(500).json({
      status: "error",
      message: "something went wrong!",
      error: error,
      statusCode: error.statusCode,
    });
  }
};

const castErrorHandler = (error) => {
  const msg = `Invalid value ${error.value} for field ${error.path}`;
  return new appError(msg, 400);
};

const errorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    devErrorHandler(res, error);
  } else {
    if (error.name === "CastError") error = castErrorHandler(error);
    prodErrorHandler(res, error);
  }
};

const notFound = (req, res, next) => {
  return next(
    new appError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
};
export { appError, errorHandler, notFound };
