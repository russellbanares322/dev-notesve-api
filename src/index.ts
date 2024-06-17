import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


const app = express();
dotenv.config()

//Middleware
app.use(cors())
app.use(express.json())

const { PORT } = process.env;

app.get("/", (req, res) => {
    res.send("It's Running")
})

app.listen(PORT)