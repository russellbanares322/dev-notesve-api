import express from 'express';
import cors from 'cors';
import { PORT } from './constants/envKeys';
import { devNotesRoutes, userRoutes } from './routes/routes';

const app = express();

//Middleware
app.use(cors({
    origin: ["http://localhost:5173"]
}))
app.use(express.json()) //req.body

//Routes
    // DevNotes Route
    app.use('/api', devNotesRoutes)
    // User Route
    app.use("/api", userRoutes)
    
app.listen(PORT)