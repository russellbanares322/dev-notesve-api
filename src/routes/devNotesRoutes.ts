import express from 'express';
import { pool } from '../connection/db';
import { DEV_NOTES } from '../constants/paths';
import { createNoteSchema, updateNoteSchema } from '../models/devNotesModel';

const router = express.Router();

// Create new note
router.post(DEV_NOTES, async(req, res) => {
    try {  
        const { error, value } = createNoteSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { title, category, content, author_id } = value;
        await pool.query("INSERT INTO tbl_devnotes (title, category, content, author_id) VALUES($1, $2, $3, $4)", [title, category, content, author_id])
    
        res.json(`Successfully created note!`);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// Update note
router.put(`${DEV_NOTES}/:id`, async(req, res) => {
    try {
        const { id } = req.params
        const { error, value } = updateNoteSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { title, category, content } = value;
         await pool.query("UPDATE tbl_devnotes SET title = $1, category = $2, content = $3, date_created = NOW() WHERE devnote_id = $4", [title, category, content, id])

         res.json(`Successfully updated note!`);
    } catch (error) {
        res.json(error.message)
    }
});

// Delete note
router.delete(`${DEV_NOTES}/:id`, async(req, res) => {
    try {
        const { id } = req.params;
      await pool.query("DELETE FROM tbl_devnotes WHERE devnote_id = $1", [id]);

        res.json(`Successfully deleted note!`);
    } catch (error) {
        res.json(error.message)
    }

})


// Get notes by authorId
router.get(DEV_NOTES, async (req, res) => {
    const { author_id, sort_direction } = req.query
    //Sort direction values: 1 = Descending 0 = Ascending
    const sortDirection = sort_direction === "1" ? "DESC" : "ASC"
    try {
        const devNote = await pool.query(`SELECT * FROM tbl_devnotes WHERE author_id = $1 ORDER BY date_created ${sortDirection}`, [author_id])
       
        res.json(devNote.rows)
    } catch (error) {
        res.json(error.message)
    }

});

// Get all categories create by author
router.get(`${DEV_NOTES}/categories`, async (req, res) => {
    const { author_id } = req.query;

    try {
        const categoriesData = await pool.query("SELECT category FROM tbl_devnotes WHERE author_id = $1 ORDER BY category ASC", [author_id]);
        const mappedCategoriesData = categoriesData.rows.map(({ category }) => category)

        res.json(mappedCategoriesData);
    } catch (error) {
        res.json(error.message)
    }
})

// Get note by id
router.get(`${DEV_NOTES}/:id`, async (req, res) => {
    const { id } = req.params;

    try {
        const devNote = await pool.query("SELECT * FROM tbl_devnotes WHERE devnote_id = $1", [id])
        
        res.json(devNote.rows[0])
    } catch (error) {
        res.json(error.message)
    }

});

export default router