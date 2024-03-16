import joi from "joi";
import errorMessages from "../../../validation/error.messages.js";

export const resetPasswordValidation = async function (user) {
  const userSchema = joi
    .object({
      newPassword: joi.string().min(8).required().max(50).trim(),
      confirmPass: joi.valid(joi.ref("newPassword")).messages({
        "any.only": "Passwords do not match",
      }),
    })
    .unknown();
  let { error, value } = userSchema.validate(user);
  if (error) error = errorMessages(error);
  return { value, error };
};