import Joi from "joi";

const DevNoteSchema = {
    title: Joi.string().required(),
    category: Joi.string().required(),
    content: Joi.string().required(),
    author_id: Joi.string().required()
}

export const paginatedNoteSchema = Joi.object({
    author_id: DevNoteSchema.author_id,
})

export const createNoteSchema = Joi.object(DevNoteSchema)

export const updateNoteSchema = Joi.object({
    title: DevNoteSchema.title,
    category: DevNoteSchema.category,
    content: DevNoteSchema.content
})