import express from 'express';
import cors from 'cors';
import { PORT } from './constants/envKeys';
import { routes } from './routes/routes';

const app = express();

//Middleware
app.use(cors({
    origin: ["http://localhost:5173"]
}))
app.use(express.json()) //req.body

    //Routes
    routes.map((route) => app.use('/api', route))
    
app.listen(PORT)