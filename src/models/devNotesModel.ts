import Joi from "joi";

const DevNoteSchema = {
    title: Joi.string().required(),
    category: Joi.string().required(),
    content: Joi.string().required(),
    author_id: Joi.string().required()
}

export const paginatedNoteParamsSchema = Joi.object({
    search: Joi.string().allow("").optional(),
    author_id: DevNoteSchema.author_id,
    sort_direction: Joi.string(),
    category: Joi.string().allow("").optional(),
    page_size: Joi.number(),
    page_number: Joi.number()
})

export const createNoteSchema = Joi.object(DevNoteSchema)

export const updateNoteSchema = Joi.object({
    title: DevNoteSchema.title,
    category: DevNoteSchema.category,
    content: DevNoteSchema.content
})