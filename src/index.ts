import express from 'express';
import cors from 'cors';
import { pool } from './connection/db';
import { PORT } from './constants/envKeys';

const app = express();

//Middleware
app.use(cors())
app.use(express.json()) //req.body

//Routes
app.post("/devnotes", async(req, res) => {
    try {
        const { category, content, authorId } = req.body;
        const newDevNote = await pool.query("INSERT INTO tbl_devnotes (category, content, authorId) VALUES($1, $2, $3)", [category, content, authorId])
    
        res.json(newDevNote);
    } catch (error) {
        throw new Error(error.message)
    }
})


app.get("/", (req, res) => {
    res.send("It's Running")
})

app.listen(PORT)