import Joi from "joi";

export const devNotesSchema = Joi.object({
    category: Joi.string().required(),
    content: Joi.string().required(),
    author_id: Joi.string().required(),
})