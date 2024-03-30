import appError from "../../../utils/appError.js";
import asyncHandler from "express-async-handler";
import Wishlist from "../models/wishlist.model.js";

export const getWishlist = asyncHandler(async (req, res, next) => {
  const wishlist = await Wishlist.findOne({ userId: req.user._id }).populate(
    "products"
  );

  res.status(200).json({
    status: "success",
    data: wishlist,
  });
});

export const addProductToWishlist = asyncHandler(async (req, res, next) => {
  const wishlist = await Wishlist.findOne({ userId: req.user._id });

  wishlist.products.push(req.params.productId);

  await wishlist.save();

  res.status(200).json({
    status: "success",
    data: wishlist,
  });
});

export const removeProductFromWishlist = asyncHandler(
  async (req, res, next) => {
    const wishlist = await Wishlist.findOne({ userId: req.user._id });

    wishlist.products = wishlist.products.filter(
      (product) => product.toString() !== req.params.productId
    );

    await wishlist.save();

    res.status(200).json({
      status: "success",
      data: wishlist,
    });
  }
);

