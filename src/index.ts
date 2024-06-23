import express from 'express';
import cors from 'cors';
import { PORT } from './constants/envKeys';
import devNotesRoutes from './routes/devNotesRoutes';

const app = express();

//Middleware
app.use(cors())
app.use(express.json()) //req.body

//Routes
    // devNotesRoutes
    app.use('/api', devNotesRoutes)

app.listen(PORT)