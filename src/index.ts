import express from 'express';
import cors from 'cors';
import { pool } from './connection/db';
import { PORT } from './constants/envKeys';
import { DEV_NOTES } from './constants/paths';
import { devNotesSchema } from './schemas/schemas';

const app = express();

//Middleware
app.use(cors())
app.use(express.json()) //req.body

/**
 * TODO: Extract this api calls in a separate file for cleaner and readable code
 */

//Routes
    // Create new note
    app.post(DEV_NOTES, async(req, res) => {
        try {  
            const { error, value } = devNotesSchema.validate(req.body);

            // If validation fails, return a 400 status with the error message
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { category, content, author_id } = value;
            await pool.query("INSERT INTO tbl_devnotes (category, content, author_id) VALUES($1, $2, $3)", [category, content, author_id])
        
            res.json(`Successfully created note!`);
        } catch (error) {
            res.status(500).json(error.message);
        }
    });

    // Update note
    app.put(`${DEV_NOTES}/:id`, async(req, res) => {
        try {
            const { id } = req.params
            const { category, content } = req.body;
             await pool.query("UPDATE tbl_devnotes SET category = $1, content = $2, date_created = NOW() WHERE devnote_id = $3 RETURNING *", [category, content, id])

             res.json(`Successfully updated note!`);
        } catch (error) {
            res.json(error.message)
        }
    });

    // Delete note
    app.delete(`${DEV_NOTES}/:id`, async(req, res) => {
        try {
            const { id } = req.params;
          await pool.query("DELETE FROM tbl_devnotes WHERE devnote_id = $1 RETURNING *", [id]);

            res.json(`Successfully deleted note!`);
        } catch (error) {
            res.json(error.message)
        }

    })

    // Get notes by authorId
    app.get(DEV_NOTES, async (req, res) => {
        const { author_id, sort_direction } = req.body
        //Sort direction values: 1 = Descending 0 = Ascending
        const sortDirection = sort_direction === 1 ? "DESC" : "ASC"
        try {
            const devNote = await pool.query(`SELECT * FROM tbl_devnotes WHERE author_id = $1 ORDER BY date_created ${sortDirection}`, [author_id])
           
            res.json(devNote.rows)
        } catch (error) {
            res.json(error.message)
        }

    });

    // Get note by id
    app.get(`${DEV_NOTES}/:id`, async (req, res) => {
        const { id  } = req.params;

        try {
            const devNote = await pool.query("SELECT * FROM tbl_devnotes WHERE devnote_id = $1", [id])
            
            res.json(devNote.rows[0])
        } catch (error) {
            res.json(error.message)
        }
    
    });

app.listen(PORT)