import joi from "joi";
import errorMessages from "./errorMessages.js";

export default async (user) => {
    const userSchema = joi.object({
        email: joi.string().email().min(5).max(50).trim(),
        username: joi.string().min(6).max(25).trim(),
        password: joi.string().min(8).max(50).required().trim(),
    }).unknown();
    let { error, value } = userSchema.validate(user);
    if (error) error = errorMessages(error);
    return { value, error };
};
