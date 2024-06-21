import express from 'express';
import cors from 'cors';
import { pool } from './connection/db';
import { PORT } from './constants/envKeys';
import { DEV_NOTES } from './constants/paths';

const app = express();

//Middleware
app.use(cors())
app.use(express.json()) //req.body

//Routes
    // Create new note
    app.post(DEV_NOTES, async(req, res) => {
        try {
            const { category, content, author_id } = req.body;
            const newDevNote = await pool.query("INSERT INTO tbl_devnotes (category, content, author_id) VALUES($1, $2, $3)", [category, content, author_id])
        
            res.json(newDevNote.rows[0]);
        } catch (error) {
            throw new Error(error.message)
        }
    });

    // Update note
    app.put(DEV_NOTES, async(req, res) => {
        try {
            const { category, content, devnote_id } = req.body;
            const updatedDevNote = await pool.query("UPDATE tbl_devnotes SET category = $1, content = $2, date_created = NOW() WHERE devnote_id = $3 RETURNING *", [category, content, devnote_id])

            res.json(updatedDevNote.rows[0])
        } catch (error) {
            throw new Error(error.message)
        }
    });

    // Delete note
    app.delete(`${DEV_NOTES}/:id`, async(req, res) => {
        try {
            const { id } = req.params;
            const deleteDevNote = await pool.query("DELETE FROM tbl_devnotes WHERE devnote_id = $1 RETURNING *", [id]);

            res.json(deleteDevNote.rows[0])
        } catch (error) {
            throw new Error(error.message)
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
            throw new Error(error.message)
        }

    });

    // Get note by id
    app.get(`${DEV_NOTES}/:id`, async (req, res) => {
        const { id  } = req.params;

        try {
            const devNote = await pool.query("SELECT * FROM tbl_devnotes WHERE devnote_id = $1", [id])
            
            res.json(devNote.rows[0])
        } catch (error) {
            throw new Error(error.message)
        }
    
    });

app.listen(PORT)