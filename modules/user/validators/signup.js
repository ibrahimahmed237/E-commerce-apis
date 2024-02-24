import joi from "joi";
import errorMessages from "./errorMessages.js";

export default async (user) => {
    const userSchema = joi
      .object({
        username: joi
          .string()
          .regex(/^[a-zA-Z0-9._]+$/)
          .min(6)
          .max(25)
          .required()
          .normalize()
          .messages({
            "string.pattern.base":
              "Username must consist of alphanumeric characters only",
          })
          .lowercase()
          .trim(),
        email: joi.string().email().min(5).max(50).trim().required(),
        password: joi.string().min(8).required().max(50).trim(),
        confirmPass: joi.valid(joi.ref("password")).messages({
          "any.only": "Passwords do not match",
        }),
        firstName: joi.string()
          .pattern(/^[a-zA-Z\s-]+$/)
          .min(2)
          .max(30)
          .required()
          .trim()
          .messages({ "string.pattern.base": "Name must be letters only" }),
        lastName: joi.string()
          .pattern(/^[a-zA-Z\s-]+$/)
          .min(2)
          .max(30)
          .required()
          .trim()
          .messages({ "string.pattern.base": "Name must be letters only" }),
        phone: joi.string().min(11).trim(),
      })
      .unknown();
    let { error, value } = userSchema.validate(user);
    if (error) error = errorMessages(error);
    return { value, error };
}
