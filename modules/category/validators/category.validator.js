import joi from "joi";
import errorMessages from "../../../validation/error.messages.js";

export const createCategoryValidator = joi.object({
  name: joi.string().required().trim().max(50).min(2),
  description: joi.string().required(),
}).unknown();

