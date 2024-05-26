import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


const app = express();
dotenv.config()

const { PORT } = process.env;

app.use(cors({
    credentials: true,
    origin: [`http://localhost:${PORT}`]
}))

app.get("/", (req, res) => {
   res.send("Hiiii")
})

app.listen(PORT)