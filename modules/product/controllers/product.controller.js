import appError from "../../../utils/appError";
import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

export const getProducts = asyncHandler(async (req, res, next) => {
  // Get all products in the category
  const category = req.query.category;
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  let skip = (page - 1) * limit;

  const products = await Product.find(category ? { category } : {})
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    status: "success",
     products,
  });
});
