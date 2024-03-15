import joi from "joi";
import errorMessages from "../../../validation/error.messages.js";

const signupValidation = async (user) => {
  const userSchema = joi
    .object({
      email: joi.string().email().min(5).max(50).trim().required(),
      password: joi.string().min(8).required().max(50).trim(),
      confirmPass: joi
        .valid(joi.ref("password"))
        .messages({
          "any.only": "Passwords do not match",
        })
        .required(),
      firstName: joi
        .string()
        .pattern(/^[a-zA-Z\s-]+$/)
        .min(2)
        .max(30)
        .required()
        .trim()
        .messages({ "string.pattern.base": "Name must be letters only" }),
      lastName: joi
        .string()
        .pattern(/^[a-zA-Z\s-]+$/)
        .min(2)
        .max(30)
        .required()
        .trim()
        .messages({ "string.pattern.base": "Name must be letters only" }),
      phoneNumber: joi.string().min(11).trim(),
      address: joi.string().min(3).max(100).trim(),
    })
    .unknown();
  let { error, value } = userSchema.validate(user);
  if (error) error = errorMessages(error);
  return { value, error };
};

const loginValidation = async (user) => {
  const userSchema = joi
    .object({
      email: joi.string().email().min(5).max(50).trim().required(),
      password: joi.string().min(8).max(50).required().trim(),
    })
    .unknown();
  let { error, value } = userSchema.validate(user);
  if (error) error = errorMessages(error);
  return { value, error };
};


export { loginValidation, signupValidation};