import Joi from "joi";

const DevNoteSchema = {
    category: Joi.string().required(),
    content: Joi.string().required(),
    author_id: Joi.string().required(), 
}

export const createNoteSchema = Joi.object(DevNoteSchema)

export const updateNoteSchema = Joi.object({
    category: DevNoteSchema.category,
    content: DevNoteSchema.content
})