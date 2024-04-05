import appError from "../../../utils/appError.js";
import asyncHandler from "express-async-handler";
import CategoryManager from "../managers/category.manager.js";

export const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await CategoryManager.getCategories(req, next);

  if (!categories) {
    return next(new appError("No categories found", 404));
  }
  
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

  if (!category) {
    return next(new appError("Category not found", 404));
  }

  res.status(200).json({
    status: "success",
    category,
  });
});

export const createCategory = asyncHandler(async (req, res, next) => {
  const category = await CategoryManager.create(req.body, next);

  if (!category) {
    return next(new appError("Category not created", 400));
  }

  res.status(201).json({
    status: "success",
    category,
  });
});
