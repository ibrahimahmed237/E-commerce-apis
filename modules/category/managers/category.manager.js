import appError from "../../../utils/appError.js";
import Category from "../models/Category.js";
import asyncHandler from "express-async-handler";

export const getCategories = asyncHandler(async (req, next) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  let skip = (page - 1) * limit;

  const categories = await Category.find({}).skip(skip).limit(limit);

  if (!categories) {
    return next(new appError("No categories found", 404));
  }
  return categories;
});

export const getCategory = asyncHandler(async (categoryId, next) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    return next(new appError("Category not found", 404));
  }

  return category;
});

export const create = asyncHandler(async (req, next) => {
  const { name, description } = req.body;
  const category = await Category.create({ name, description });
  if (!category) {
    return next(new appError("Category not created", 400));
  }

  return category;
});

const CategoryManager = { getCategories, getCategory, create };
export default CategoryManager;
