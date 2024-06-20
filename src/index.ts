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
 //Post
    app.post(DEV_NOTES, async(req, res) => {
        try {
            const { category, content, author_id } = req.body;
            const newDevNote = await pool.query("INSERT INTO tbl_devnotes (category, content, author_id) VALUES($1, $2, $3)", [category, content, author_id])
        
            res.json(newDevNote.rows[0]);
        } catch (error) {
            throw new Error(error.message)
        }
    })

    // Get notes by authorId
    app.get(`${DEV_NOTES}`, async (req, res) => {
        const { author_id, sort_direction } = req.body
        //Sort direction values: 1 = Descending 0 = Ascending
        const sortDirection = sort_direction === 1 ? "DESC" : "ASC"
        try {
            const devNote = await pool.query(`SELECT * FROM tbl_devnotes WHERE author_id = $1 ORDER BY date_created ${sortDirection}`, [author_id])
           
            res.json(devNote.rows)
        } catch (error) {
            throw new Error(error.message)
        }

    })

// Get note by id
    app.get(`${DEV_NOTES}/:id`, async (req, res) => {
        const { id  } = req.params;
        const devnote_id = id;

        try {
            const devNote = await pool.query("SELECT * FROM tbl_devnotes WHERE devnote_id = $1", [devnote_id])
            
            res.json(devNote.rows[0])
        } catch (error) {
            throw new Error(error.message)
        }
    
    })



app.get("/", (_, res) => {
    res.send("GG")
})

app.listen(PORT)