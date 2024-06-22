import dotenv from 'dotenv';

dotenv.config()

export const { 
    PORT, 
    PG_PASSWORD, 
    PG_USER,
    PG_HOST,
    PG_PORT,
    PG_DATABASE
} = process.env;