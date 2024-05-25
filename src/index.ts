import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const { PORT } = process.env;

const app = express();
dotenv.config()

app.use(cors({
    credentials: true,
    origin: [`http://localhost:${PORT}`]
}))