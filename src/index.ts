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
            const { category, content, authorId } = req.body;
            const newDevNote = await pool.query("INSERT INTO tbl_devnotes (category, content, authorId) VALUES($1, $2, $3)", [category, content, authorId])
        
            res.json(newDevNote);
        } catch (error) {
            throw new Error(error.message)
        }
    })

//Get
    app.get(DEV_NOTES, async (_, res) => {
        const devNotes = await pool.query("SELECT * FROM tbl_devnotes");

        res.json(devNotes)
    })

// Get note by id
    app.get(`${DEV_NOTES}/:id`, async (req, res) => {
        const { id  } = req.params;
        const devNoteId = id;

        const devNote = await pool.query("SELECT * FROM tbl_devnotes WHERE devNoteId = $1", [devNoteId])
    
        res.json(devNote)
    })

// Get notes by authorId -- NEEDS TO BE FIXED
    app.get(DEV_NOTES, async (req, res) => {
        const { authorId } = req.body

        const devNote = await pool.query("SELECT * FROM tbl_devnotes WHERE authorId = $1 ORDER BY dateCreated DESC", [authorId])

        res.json(devNote)
    })

app.get("/", (_, res) => {
    res.send("GG")
})

app.listen(PORT)