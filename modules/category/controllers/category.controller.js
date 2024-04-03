import appError from "../../../utils/appError";
import asyncHandler from "express-async-handler";
import CategoryManager from "../managers/category.manager";

export const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await CategoryManager.getCategories(req, next);

  res.status(200).json({
    status: "success",
    categories,
  });
});

export const getCategory = asyncHandler(async (req, res, next) => {
  const category = await CategoryManager.getCategory(
    req.params.categoryId,
    next
  );

  res.status(200).json({
    status: "success",
    category,
  });
});

export const createCategory = asyncHandler(async (req, res, next) => {
  const category = await CategoryManager.create(req.body);

  res.status(201).json({
    status: "success",
    category,
  });
});
