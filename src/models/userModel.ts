import Joi from "joi";

const UserSchema = {
    user_id: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required()
}

export const createUserSchema = Joi.object(UserSchema)